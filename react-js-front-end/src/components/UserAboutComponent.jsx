import React, { Component } from 'react'
import UserService from '../services/user.service';

export default class UserAboutComponent extends Component {

    constructor(props){
        super(props);

        this.state = {
          //  id:this.props.match.params.id,
            tradesmen:{},
            adverts: [],
            address:{}
        }
    }
    componentDidMount(){
        this.getUserDetail(this.props.userId);
        UserService.getAdvertsByTradesmenId(this.props.userId).then((res)=>{
            this.setState({ adverts: res.data});
        });
        UserService.getAddressByTradesmenId(this.props.userId).then((res)=>{
            this.setState({ address: res.data});
        });
       // console.log(this.props.userId);//burdan bi incele

    }

    getUserDetail=(userId)=>{
        UserService.getTradesmenById(userId).then((res)=>{
            this.setState({ tradesmen: res.data});
        });
    }
    render() {
        return (
            <div>
                       <header className="jumbotron">
          <h3>
            <strong>{this.state.tradesmen.username}</strong> Profile
          </h3>
        </header>

        <table className = "table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Advert Name</th>
                        <th>Advert Category</th>
                        <th>Advert Description</th>
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
                            </tr>
                        )
                    }
                </tbody>
            </table>

                <h2>Email:{this.state.tradesmen.email}</h2>
                <h2>Tel No:{this.state.tradesmen.telNo}</h2>
                <h2>Category:{this.state.tradesmen.category}</h2>

                <table className = "table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>province</th>
                        <th>district</th>
                        <th>neighborhood</th>
                        <th>street</th>
                        <th>doorNo</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        
                            <tr key = {this.state.address.tradesmenId}>
                                <td>{this.state.address.province}</td>
                                <td>{this.state.address.district}</td>
                                <td>{this.state.address.neighborhood}</td>
                                <td>{this.state.address.street}</td>
                                <td>{this.state.address.doorNo}</td>
                            </tr>
                        
                    }
                </tbody>
            </table>

                <button onClick = {()=>this.props.func.aboutFalse()} 
                                    className="byn btn-warning" style={{marginLeft: "20px", borderRadius:"10px"}}>back</button>
            </div>
        )
    }
}
