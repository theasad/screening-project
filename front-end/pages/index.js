import React from 'react'
import Layout from '../components/Layout.js';
import axios from 'axios';
import FolderLink from '../components/Folder'


export default class Folder extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            folders: [],
            isLoading: false,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        axios.get('http://127.0.0.1:8000/api/v1/drive/')
            .then(res => {
                const folders = res.data;
                this.setState({ folders: folders, isLoading: false });
                console.log("hello----------sdfsfsdf----------------")
            })
    }

    render() {
        const { folders, isLoading } = this.state;

        if (isLoading) {
            return <p>Loading ...</p>;
        }

        return (
            <Layout>
                <h1>My Blog</h1>
                <ul>
                    {folders.map(folder => {
                        return <FolderLink key={folder.slug} slug={folder.slug} title={folder.name} />
                    })}
                </ul>
            </Layout>
        );
    }
}