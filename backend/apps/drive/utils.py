import os
import re

from django.conf import settings
from django.template.defaultfilters import slugify


def unique_slugify(instance, value, slug_field_name='slug', queryset=None,
                   slug_separator='-'):
    """
    Calculates and stores a unique slug of ``value`` for an instance.

    ``slug_field_name`` should be a string matching the name of the field to
    store the slug in (and the field to check against for uniqueness).

    ``queryset`` usually doesn't need to be explicitly provided - it'll default
    to using the ``.all()`` queryset from the model's default manager.
    """
    slug_field = instance._meta.get_field(slug_field_name)

    slug = getattr(instance, slug_field.attname)
    slug_len = slug_field.max_length

    # Sort out the initial slug, limiting its length if necessary.
    slug = slugify(value)
    if slug_len:
        slug = slug[:slug_len]
    slug = _slug_strip(slug, slug_separator)
    original_slug = slug

    # Create the queryset if one wasn't explicitly provided and exclude the
    # current instance from the queryset.
    if queryset is None:
        queryset = instance.__class__._default_manager.all()
    if instance.pk:
        queryset = queryset.exclude(pk=instance.pk)

    # Find a unique slug. If one matches, at '-2' to the end and try again
    # (then '-3', etc).
    next = 2
    while not slug or queryset.filter(**{slug_field_name: slug}):
        slug = original_slug
        end = '%s%s' % (slug_separator, next)
        if slug_len and len(slug) + len(end) > slug_len:
            slug = slug[:slug_len-len(end)]
            slug = _slug_strip(slug, slug_separator)
        slug = '%s%s' % (slug, end)
        next += 1

    setattr(instance, slug_field.attname, slug)


def _slug_strip(value, separator='-'):
    """
    Cleans up a slug by removing slug separator characters that occur at the
    beginning or end of a slug.

    If an alternate separator is used, it will also replace any instances of
    the default '-' separator with the new separator.
    """
    separator = separator or ''
    if separator == '-' or not separator:
        re_sep = '-'
    else:
        re_sep = '(?:-|%s)' % re.escape(separator)
    # Remove multiple instances and if an alternate separator is provided,
    # replace the default '-' separator.
    if separator != re_sep:
        value = re.sub('%s+' % re_sep, separator, value)
    # Remove separator from the beginning and end of the slug.
    if separator:
        if separator != '-':
            re_sep = re.escape(separator)
        value = re.sub(r'^%s+|%s+$' % (re_sep, re_sep), '', value)
    return value


def get_media_filesize(file):
    unit = 'bytes'
    size = 0
    file_dir = "{}/{}".format(settings.MEDIA_ROOT, file)
    if os.path.exists(file_dir):
        size = os.path.getsize(file_dir)
        size, unit = (size/1024, 'KB') if size >= 1024 else (size, unit)

        size, unit = (size/1024, 'MB') if size >= 1024 else (size, unit)

        size, unit = (size/1024, 'GB') if size >= 1024 else (size, unit)
        size = round(size, 2)
        size_str = "{} {}".format(size, unit)
    else:
        size_str = "{} {}".format(size, unit)

    return size_str


def get_file_icon(request, filename):
    name_split = filename.split('.')
    icon_name = 'file'
    if len(name_split) > 1:
        icon_name = name_split[-1].lower()
        if icon_name in ['jpg', 'jpeg']:
            icon_name = 'jpg'
        elif icon_name in ['doc', 'docx']:
            icon_name = 'word'
        elif icon_name in ['ppt', 'pptx']:
            icon_name = 'powerpoint'

        icon_dir = "{}/icons/{}.png".format(settings.STATIC_ROOT, icon_name)

        # Check icon exist or not
        is_file_exists = os.path.exists(icon_dir)
        if not is_file_exists:
            icon_name = 'file'

    icon_url = "{}{}.png".format(settings.FILE_ICON_URL, icon_name)
    return request.build_absolute_uri(icon_url)
