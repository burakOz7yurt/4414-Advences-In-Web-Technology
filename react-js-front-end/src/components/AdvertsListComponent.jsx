import React, { Component } from 'react'
import UserService from '../services/user.service'
import AdvertAboutComponent from './AdvertAboutComponent'

export default class AdvertsListComponent extends Component {

    constructor(props){
        super(props);

        this.state = {
            adverts: [],
            isAbout:false,
            tradesmenId:null,
            advertId:null,
            categoryContain:'',

        }
    }
    componentDidMount(){
        UserService.getAllAdverts().then((res)=>{
            this.setState({ adverts: res.data});
        });
    }
    changeAdvertCategoryContainHandler = (event) =>{
        this.setState({categoryContain : event.target.value});
    }

    getAdvertsWithCategoryContain=()=>{
        if(this.state.categoryContain)
        {
            UserService.getAdvertsByCategoryContain(this.state.categoryContain).then((res)=>{
                this.setState({ adverts: res.data});
            });
        }
        else{
            UserService.getAllAdverts().then((res)=>{
                this.setState({ adverts: res.data});
            });
        }
    }

    advertsList=()=>{
        return (

           
            <div>
               
            <h2 className="text-center">Adverts List</h2>
                     <div style={{display:"inline-block", margin:"0px", padding:"0px"}} >
                     <button onClick = {()=>this.getAdvertsWithCategoryContain()} 
                      style={{display:"inline-block"}} className="btn btn-primary" >Fetch by Category</button>

                     <input style={{display:"inline-block"}} placeholder="category.." name="categoryContain" className="form-control"
                    value={this.state.categoryContain} onChange={this.changeAdvertCategoryContainHandler}></input>
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

                                    <button onClick = {()=>this.aboutTrue(adverts.tradesmenId,adverts.id)} 
                                    className="byn btn-warning" style={{marginLeft: "20px", borderRadius:"10px"}}>about</button>
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

    aboutTrue=(tradesmenId,advertId)=>{
        this.setState({isAbout:true,tradesmenId:tradesmenId,advertId:advertId})
    }
    aboutFalse=()=>{
        this.setState({isAbout:false})
    }
    render() {
        if(this.state.isAbout){
            return <AdvertAboutComponent ids={{tradesmenId:this.state.tradesmenId, advertId:this.state.advertId}} func={{aboutFalse:this.aboutFalse.bind(this)}}></AdvertAboutComponent>
        }else{
            return this.advertsList();
        }
    }
}
