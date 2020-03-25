import React from 'react';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      first_name: '',
      last_name: '',
      avg_grade: 0,
      students: []
    };

    this.fetchStudents();
  }

  fetchStudents = () => {
    fetch('http://localhost:9090/api/v1/students')
      .then(res => res.json())
      .then(data => {
        this.setState({
          students: data
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  addStudent = () => {
    fetch(
      'http://localhost:9090/api/v1/students',
      {
        method: 'post',
        body: JSON.stringify({
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          avg_grade: this.state.avg_grade,
        }),
        headers: {
          'content-type': 'application/json'
        }
      }
    )
    .then(res => {
      if(res.ok){
        alert('Student saved!');
      }
    })
    .catch(err => {
      console.error(err);
    });
  };

  inputOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <>
      <div>
          <input type="text" name="first_name" placeholder="first_name" value={this.state.first_name} onChange={this.inputOnChange}/>
          <input type="text" name="last_name" placeholder="last_name" value={this.state.last_name} onChange={this.inputOnChange}/>
          <input type="number" name="avg_grade" placeholder="avg_grade" value={this.state.avg_grade} onChange={this.inputOnChange}/>
          <button onClick={this.addStudent}>Add student</button>
      </div>
      <hr/>
      <table border="1" width="50%">
        <thead>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Delete</th>
          <th>Edit</th>
        </tr>
        </thead>
        <tbody>
      {this.state.students.map((v) => {
          return (
            <tr key={v._id}>
              <td>{v.first_name}</td>
              <td>{v.last_name}</td>
              <td>
                <button>Delete</button>
              </td>
              <td>
                <button>Edit</button>
              </td>
            </tr>
           )
         })
        }
        </tbody>
      </table>
      </>
    );
  }
}

export default App;
