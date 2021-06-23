import React, { Component } from 'react'
import authService from '../services/auth.service';

export default class AddAdvert extends Component {

    constructor(props){
        super(props)

        this.state = {
            
                tradesmenId : '',
                advertName : '',
                advertCategory: '',
                advertDesc: ''
            
        }
     }

     componentDidMount(){
        const { tradesmenId } = this.props;
        this.setState({ tradesmenId: tradesmenId});
      //  console.log("asd:"+tradesmenId);

    }

    changeAdvertNameHandler = (event) =>{
        this.setState({advertName : event.target.value});
    }
    
       changeAdvertCategoryHandler = (event) =>{
        this.setState({advertCategory : event.target.value});
    }
    
    changeAdvertDescHandler = (event) =>{
        this.setState({advertDesc : event.target.value});
    }
    
    addAdvertToList=()=>{
        authService.addAdvert(this.state.tradesmenId, this.state.advertName, this.state.advertCategory, this.state.advertDesc);
        this.props.func.aboutFalse();
    }

render() {
    return (
      <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Add An Advert</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Advert Name </label>
                                        <input placeholder="name.." name="advertName" className="form-control"
                                        value={this.state.advertName} onChange={this.changeAdvertNameHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label>  Advert Category </label>
                                        <input placeholder="ürün satış" name="advertCategory" className="form-control"
                                        value={this.state.advertCategory} onChange={this.changeAdvertCategoryHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label> Advert Description </label>
                                        <input placeholder="çamaşır makinası 2500tl.." name="advertDesc" className="form-control"
                                        value={this.state.advertDesc} onChange={this.changeAdvertDescHandler}></input>
                                    </div> 
                                    <button className="btn btn-success" onClick={this.addAdvertToList}>Add MyAdverts</button>
                                    <button className="btn btn-danger" onClick = {()=>this.props.func.aboutFalse()} style = {{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

    )
}
}
