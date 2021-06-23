import React, { Component } from 'react'
import UserService from '../services/user.service';

export default class AdvertAboutComponent extends Component {

    constructor(props){
        super(props);

        this.state = {
          //  id:this.props.match.params.id,
            tradesmen:{},
            advert:{},
            address:{}
        }
    }
    componentDidMount(){
        this.getUserDetail(this.props.ids.tradesmenId);
        this.getAdvertDetail(this.props.ids.advertId);
       // console.log(this.props.userId);//burdan bi incele

       UserService.getAddressByTradesmenId(this.props.ids.tradesmenId).then((res)=>{
        this.setState({address:res.data /*province: res.data.province, district: res.data.district, neighborhood: res.data.neighborhood, 
        street: res.data.street, doorNo: res.data.doorNo*/});
      });

    }
    getUserDetail=(userId)=>{
        UserService.getTradesmenById(userId).then((res)=>{
            this.setState({ tradesmen: res.data});
        });
    }

    getAdvertDetail=(advertId)=>{
        UserService.getAdvertById(advertId).then((res)=>{
            this.setState({ advert: res.data});
        });
    }
    render() {
        return (
            <div>
                 <h2>Advert Name:{this.state.advert.advertName}</h2>
                <h2>Advert Category:{this.state.advert.advertCategory}</h2>
                <h2>Advert Description:{this.state.advert.advertDesc}</h2>
                <br></br>
                <h3>Trademen Info</h3>
                <div style={{backgroundColor: "rgb(105,212,115)", borderRadius:"10px"}}>
        <p>
            <strong>Name:</strong>{" "}
            {this.state.tradesmen.username}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {this.state.tradesmen.email}
          </p>
          <p>
            <strong>Tel No::</strong>{" "}
            {this.state.tradesmen.telNo}
          </p>
          <p>
            <strong>Category:</strong>{" "}
            {this.state.tradesmen.category}
          </p>
                </div>
                <h3>Address</h3>
    
     <div style={{backgroundColor: "rgb(125,203,219)", borderRadius:"10px"}}>

                <p>
            <strong>province:</strong>{" "}
            {this.state.address.province}
          </p>
          <p>
            <strong>district:</strong>{" "}
            {this.state.address.district}
          </p>
          <p>
            <strong>neighborhood:</strong>{" "}
            {this.state.address.neighborhood}
          </p>
          <p>
            <strong>street:</strong>{" "}
            {this.state.address.street}
          </p>
          <p>
            <strong>doorNo:</strong>{" "}
            {this.state.address.doorNo}
          </p>

                 </div>

                <button onClick = {()=>this.props.func.aboutFalse()} 
                                    className="byn btn-warning" style={{marginLeft: "20px", borderRadius:"10px"}}>back</button>
            </div>
        )
    }
}
