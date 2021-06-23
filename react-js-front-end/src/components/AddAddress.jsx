import React, { Component } from 'react'
import authService from '../services/auth.service';
import UserService from '../services/user.service';

export default class AddAdress extends Component {

    constructor(props){
        super(props)

        this.state = {
            
                tradesmenId : '',
                province : '',
                district: '',
                neighborhood: '',
                street:'',
                doorNo:''
            
        }
     }
     componentDidMount(){
        const { tradesmenId } = this.props;
        this.setState({ tradesmenId: tradesmenId});
        UserService.getAddressByTradesmenId(tradesmenId).then((res)=>{
            this.setState({ province: res.data.province, district: res.data.district, neighborhood: res.data.neighborhood, 
                street: res.data.street, doorNo: res.data.doorNo});
        });
      //  console.log("asd:"+tradesmenId);
    }

    changeProvinceHandler = (event) =>{
        this.setState({province : event.target.value});
    }
    
       changeDistrictHandler = (event) =>{
        this.setState({district : event.target.value});
    }
    
    changeNeighborhoodHandler = (event) =>{
        this.setState({neighborhood : event.target.value});
    }
    changeStreetHandler = (event) =>{
        this.setState({street : event.target.value});
    }
    changeDoorNoHandler = (event) =>{
        this.setState({doorNo : event.target.value});
    }

    addAddress=()=>{
        authService.addAddress(this.state.tradesmenId, this.state.province, this.state.district, 
            this.state.neighborhood, this.state.street, this.state.doorNo);
        this.props.func.aboutFalse();
    }

    render() {
        return (
            <div className="container">
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h3 className="text-center">Add Your Address</h3>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label> Province </label>
                                <input placeholder="İzmir.." name="province" className="form-control"
                                value={this.state.province} onChange={this.changeProvinceHandler}></input>
                            </div>
                            <div className="form-group">
                                <label>  District </label>
                                <input placeholder="Buca" name="district" className="form-control"
                                value={this.state.district} onChange={this.changeDistrictHandler}></input>
                            </div>
                            <div className="form-group">
                                <label> Neighborhood </label>
                                <input placeholder="Adatepe mah." name="neighborhood" className="form-control"
                                value={this.state.neighborhood} onChange={this.changeNeighborhoodHandler}></input>
                            </div> 
                            <div className="form-group">
                                <label> Street </label>
                                <input placeholder="Adatepe mah." name="neighborhood" className="form-control"
                                value={this.state.street} onChange={this.changeStreetHandler}></input>
                            </div>
                            <div className="form-group">
                                <label> Door No </label>
                                <input placeholder="Adatepe mah." name="doorNo" className="form-control"
                                value={this.state.doorNo} onChange={this.changeDoorNoHandler}></input>
                            </div>
                            <button className="btn btn-success" onClick={this.addAddress}>Add My Adress</button>
                            <button className="btn btn-danger" onClick = {()=>this.props.func.aboutFalse()} style = {{marginLeft: "10px"}}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
