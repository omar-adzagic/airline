import React from 'react';
import UserService from "../services/UserService";

class UserComponent extends React.Component {
   constructor() {
      super();
      this.state = {
         users: [],
      }
   }

   componentDidMount() {
      UserService.getUsers().then(response => {
         this.setState({ users: response.data });
      });
   }

   render() {
      return (
         <div>
            <h1 className="text-center">Lista korisnika</h1>
            <table className="table table-striped">
               <thead>
                  <tr>
                     <td>ID</td>
                     <td>Ime</td>
                     <td>Prezime</td>
                     <td>Email adresa</td>
                     <td>Korisničko ime</td>
                     <td>Aktivan</td>
                  </tr>
               </thead>
               <tbody>
                  {
                     this.state.users.map(
                        user => {
                           const badge = user.active ?
                              <span className="badge badge-success">Da</span> :
                              <span className="badge badge-warning">Ne</span>;
                           return (<tr key={user.id}>
                              <td>{ user.id }</td>
                              <td>{ user.firstName }</td>
                              <td>{ user.lastName }</td>
                              <td>{ user.email }</td>
                              <td>{ user.userName }</td>
                              <td>{ badge }</td>
                           </tr>)
                        }
                     )
                  }
               </tbody>
            </table>
         </div>
      );
   }
}

export default UserComponent;