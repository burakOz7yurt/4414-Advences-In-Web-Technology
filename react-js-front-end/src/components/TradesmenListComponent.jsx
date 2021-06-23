import React, { Component } from 'react'
import UserService from '../services/user.service';
import UserAboutComponent from './UserAboutComponent';

export default class TradesmenListComponent extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            tradesmens: [],
            isAbout:false,
            selectedUserId:null,
            categoryContain:'',

        }
    }

    componentDidMount(){
        UserService.getAllTradesmen().then((res)=>{
            this.setState({ tradesmens: res.data});
        });
    }
    
    changeUserCategoryContainHandler = (event) =>{
        this.setState({categoryContain : event.target.value});
    }

    getUsersWithCategoryContain=()=>{
        if(this.state.categoryContain)
        {
            UserService.getUsersByCategoryContain(this.state.categoryContain).then((res)=>{
                this.setState({ tradesmens: res.data});
            });
        }
        else{
            UserService.getAllTradesmen().then((res)=>{
                this.setState({ tradesmens: res.data});
            });
        }
    }
    tradesmenList=()=>{
        return (

           
            <div>
               
            <h2 className="text-center">Tradesmen List</h2>
            <div className="buttons-show row">
            <div style={{display:"inline-block", margin:"0px", padding:"0px"}} >
                     <button onClick = {()=>this.getUsersWithCategoryContain()} 
                      style={{display:"inline-block"}} className="btn btn-primary" >Fetch by Category</button>

                     <input style={{display:"inline-block"}} placeholder="category.." name="categoryContain" className="form-control"
                    value={this.state.categoryContain} onChange={this.changeUserCategoryContainHandler}></input>
                     </div>
                  {/* <div>
                        <button style={{marginRight:'10px'}} className="btn btn-primary" onClick={this.registerTradesmen}>Sign Up</button>
                        <button className="btn btn-primary" onClick={this.logIn}>Log In</button>
                     </div>*/}  
                     
            </div>
            <div  className="row">
               

            <table className = "table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Tradesmen Name</th>
                        <th>Tradesmen Category</th>
                        <th>Telephone</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.tradesmens.map(
                            tradesmen =>
                            <tr key = {tradesmen.id}>
                                <td>{tradesmen.username}</td>
                                <td>{tradesmen.category}</td>
                                <td>{tradesmen.telNo}</td>
                                <td>
                                    {/*                                    <button onClick = {()=>this.editEmployee(tradesmen.id)} 
                                    className="byn btn-info" style={{marginRight: "10px", borderRadius:"10px"}}>tradesmen's ads</button>
                               
                                     <button onClick = {()=>this.viewEmployee(tradesmen.id)} 
                                    className="byn btn-warning" style={{marginLeft: "20px", borderRadius:"10px"}}>about</button> */}
                                     <button onClick = {()=>this.aboutTrue(tradesmen.id)} 
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
    aboutTrue=(id)=>{
        this.setState({isAbout:true,selectedUserId:id})
    }
    aboutFalse=()=>{
        this.setState({isAbout:false})
    }
    render() {
        if( this.state.isAbout)
        {
            return <UserAboutComponent userId={this.state.selectedUserId} func={{aboutFalse:this.aboutFalse.bind(this)}}></UserAboutComponent>
        }
        else{
            return  this.tradesmenList();

        }
    }
}
