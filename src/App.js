import React, { Component } from 'react';
import './App.css';
import http from './services/httpService';

const endPoint = 'https://jsonplaceholder.typicode.com/posts';

class App extends Component {
  state = {
    posts: []
  };

  handleAdd = async () => {
    const obj = { title: 'a', body: 'b' };
    const { data: post } = await http.post(endPoint, obj);
    console.log(post);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async post => {
    post.title = 'CHANGED title';
    const { data } = await http.put(`${endPoint}/${post.id}`, post);
    console.log(data);

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };

  handleDelete = async post => {
    const initialPosts = [...this.state.posts];
    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });

    try {
      await http.delete(`${endPoint}/${post.id}`);
    } catch (err) {
      // err.request
      // err.response
      // Expected (404: not found, 400: bad request) - CLIENT ERRORS
      // Display specific error message

      // Unexpected (network down, server down, db down, bug)
      // Log error
      // Display some friendly message
      if (err.response && err.request.status === 404) {
        alert('Seems like this post has already been deleted');
      }
      this.setState({ posts: initialPosts });
    }
  };

  async componentDidMount() {
    const { data: posts } = await http.get(endPoint);
    this.setState({ posts });
  }

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button className="btn btn-info btn-sm" onClick={() => this.handleUpdate(post)}>
                    Update
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => this.handleDelete(post)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
