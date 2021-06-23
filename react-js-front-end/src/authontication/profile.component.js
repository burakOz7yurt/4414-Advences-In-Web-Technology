import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AddAdvert from "../components/AddAdvert";
import AddAddress from "../components/AddAddress";
import UpdateAdvertComponent from "../components/UpdateAdvertComponent";
import AuthService from "../services/auth.service";
import UserService from '../services/user.service';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      addAdvert:false,
      addAddress:false,
      updateAdvert:false,
      myId:'',
      selectedAdvertId:'',
      province : '',
      district: '',
      neighborhood: '',
      street:'',
      doorNo:'',
      adverts:[]
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true  })

    this.getAdverts(currentUser.id);
  
    this.setState({myId:currentUser.id})

  UserService.getAdvertsByTradesmenId(currentUser.id).then((res)=>{
    this.setState({ adverts: res.data});
  });

  UserService.getAddressByTradesmenId(currentUser.id).then((res)=>{
    this.setState({ province: res.data.province, district: res.data.district, neighborhood: res.data.neighborhood, 
      street: res.data.street, doorNo: res.data.doorNo});
  });

  }

  addAdvert=(tradesmenId)=>{
    this.setState({addAdvert:true})
  }

  addAdvertFale=()=>{
    this.getAdverts(this.state.myId);
    this.setState({addAdvert:false})
  }

  addAddress=(tradesmenId)=>{
    this.setState({myId:tradesmenId,addAddress:true})
  }

  addAddressFalse=()=>{
    this.setState({addAdvert:false})
  }

  updateAdvert=(id)=>{
    this.setState({updateAdvert:true,selectedAdvertId:id})
    
  }

  updateAdvertFalse=()=>{
    this.setState({updateAdvert:false})
    this.getAdverts(this.state.myId);
    this.getAdverts(this.state.myId);
  }

  getAdverts=(id)=>{

    UserService.getAdvertsByTradesmenId(id).then((res)=>{
      setTimeout(() => {
        this.setState({ adverts: res.data});
      }, 500);
    });
  }

  deleteAdvert=(id)=>{
    console.log("basıldı"+id);
    AuthService.deleteAdvert(id);
    this.getAdverts(this.state.myId);
    this.getAdverts(this.state.myId);
  //  console.log(this.state.adverts);
  }
  advertsList=()=>{
    return (
        <div>
           
        <h2 className="text-center">Adverts List</h2>
        <div className="buttons-show row">
     
        </div>
        <div  className="row">
           

        <table className = "table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Advert Name</th>
                    <th>Advert Category</th>
                    <th>Advert Description</th>
                    <th>Actions</th>

                </tr>
            </thead>
            <tbody>
                {
                    this.state.adverts.map(
                        adverts =>
                        <tr key = {adverts.id}>
                            <td>{adverts.advertName}</td>
                            <td>{adverts.advertCategory}</td>
                            <td>{adverts.advertDesc}</td>
                            <td>
                                <button onClick = {()=>this.updateAdvert(adverts.id)} 
                                className="byn btn-info" style={{marginLeft: "20px", borderRadius:"10px"}}>Update</button>
                                  <button onClick = {()=>this.deleteAdvert(adverts.id)} 
                                className="byn btn-danger" style={{marginLeft: "20px", borderRadius:"10px"}}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>

        </div>

    </div>
    )
}

  render() {

    if(this.state.addAdvert && !this.state.addAddress && !this.state.updateAdvert){
      return <AddAdvert tradesmenId={this.state.currentUser.id} func={{aboutFalse:this.addAdvertFale.bind(this)}}></AddAdvert>
    }
    else if(this.state.addAddress  && !this.state.updateAdvert){
      return <AddAddress tradesmenId={this.state.currentUser.id} func={{aboutFalse:this.addAddressFalse.bind(this)}}></AddAddress>
    }
    else if(this.state.updateAdvert){
      return <UpdateAdvertComponent id={this.state.selectedAdvertId} func={{aboutFalse:this.updateAdvertFalse.bind(this)}}></UpdateAdvertComponent>

    }
    else{
      if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
      }
      const { currentUser } = this.state;

  
      return (
        <div className="container">
          {(this.state.userReady) ?
          <div>
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.username}</strong> Profile
            </h3>
          </header>
              
          <p>
            <strong>Email:</strong>{" "}
            {currentUser.email}
          </p>
          <p>
            <strong>Tel No:</strong>{" "}
            {currentUser.telNo}
          </p>
          <p>
            <strong>Category:</strong>{" "}
            {currentUser.category}
          </p>
              <h2>ADDRESS</h2>
          <p>
            <strong>Province:</strong>{" "}
            {this.state.province}
          </p>
          <p>
            <strong>District:</strong>{" "}
            {this.state.district}
          </p>
          <p>
            <strong>Neighborhood:</strong>{" "}
            {this.state.neighborhood}
          </p>
          <p>
            <strong>Street:</strong>{" "}
            {this.state.street}
          </p>
          <p>
            <strong>Door No:</strong>{" "}
            {this.state.doorNo}
          </p>
          <div>{this.advertsList()}</div>
        </div>: null}
        <button onClick = {()=>this.addAdvert(currentUser.id)} 
                                    className="byn btn-warning" style={{marginLeft: "20px", borderRadius:"10px"}}>Add Advert</button>
        <button onClick = {()=>this.addAddress(currentUser.id)} 
                                    className="byn btn-warning" style={{marginLeft: "20px", borderRadius:"10px"}}>Add Address</button>
        </div>);
    }
   
    
  }
}
