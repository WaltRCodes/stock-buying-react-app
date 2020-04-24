import React, { Component, createContext } from "react";
import { auth, generateUserDocument } from "../firebase";


export const UserContext = createContext({ user: null });
{/* create the user context */}
class UserProvider extends Component {
  state = {
    user: null
  };

  
  
  componentDidMount = async () => {
    auth.onAuthStateChanged(async userAuth => {
      const user = await generateUserDocument(userAuth);
      this.setState({ user });
    });

{/* checks to see if a userdocument is found on page load */}
  };

  render() {
    const { user } = this.state;
{/* sets user to state */}
    return (
      <UserContext.Provider value={user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;