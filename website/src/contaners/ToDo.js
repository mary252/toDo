import React, { Component } from "react";
import{ Checkbox} from "../components/Checkbox"
import axios from 'axios'

class ToDo extends Component{
    state={
        entry_title:"",
        entries:[
            {
                id:0,
                done:false,
                name:"entry"
            },
            {
                id:1,
                done:true,
                name:"entry"
            }
        ]
    }


    async componentDidMount() {

        axios.get("http://localhost:3800/todo").then(res=>{
            this.setState({
                entries:res.data.results
            })
        }).catch(e=>{
            console.log(e)
        })

    }
    draw_entries=()=>{
         return this.state.entries.map((entry ,i)=>(
            <div id={i} className="columns is-mobile ">
                <div className="column is-1 is-flex aic">
                    <Checkbox ischecked={entry.done}
                    onClick={() => this.toogle_state(i)}
                    />
            </div>
            <div className="column is-9 ">
                <label>{entry.comment}</label>
            </div>
            <div className="column is-2 ">
                <div onClick={()=> this.delete(i)}>
                    <label className="fas fa-trash-alt"/>
                </div>
                
            </div>
        </div>
         ))
    }
    store_data = (event, input) => {
        this.setState({
          [input]: event.target.value
        });
      };
    Add= async () =>{

        axios.post("http://localhost:3800/todo",{
            comment:this.state.entry_title
        }).then(res=>{
            console.log(res)
            this.setState({
                entries:res.data.results,
                entry_title:""
            })
        }).catch(e=>{
            console.log(e)
        })

       


    }
    toogle_state = async (i) => {
        let cur_entries=this.state.entries
        console.log(cur_entries[i])
        if(cur_entries[i].done===0){
            axios.post(`http://localhost:3800/done/${cur_entries[i].id}`).then(res=>{
                console.log(res)
            }).catch(e=>{
                console.log(e)
            })
            cur_entries[i].done=1
        }else{
            axios.post(`http://localhost:3800/undo/${cur_entries[i].id}`).then(res=>{
                console.log(res)
            }).catch(e=>{
                console.log(e)
            })
            cur_entries[i].done=0
        }
        this.setState({
            entries:cur_entries,

        })
      };
      delete=async (i) =>{
        let cur_entries=this.state.entries

        axios.delete(`http://localhost:3800/delete/${cur_entries[i].id}`).then(res=>{
            console.log(res)
        }).catch(e=>{
            console.log(e)
        })
        cur_entries.splice(i, 1);
        this.setState({
            entries:cur_entries,

        })
      }
    render(){
        return(
            <div className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column is-3"/>
                        <div className="column is-6 todo">
                            <p className="page-title">To Do</p>
                            <div className="new-entry-container">
                                <p className="entry-name">title</p>
                                <div className="columns is-mobile">
                                    <div className="column is-8">
                                        <input className="input" 
                                        value={this.state.entry_title}
                                        onKeyPress={e => {
                                            if (e.key === "Enter") {
                                              this.Add();
                                            }
                                          }}
                                        onChange={e => this.store_data(e, "entry_title")}/>
                                    </div>
                                    <div className="column is-4">
                                        <button className="add-button"
                                        onClick={()=>this.Add()}>
                                        Add
                                        </button>
                                    </div>
                                </div>

                                
                            </div>
                            {
                                this.draw_entries()
                            }
                        </div>
                        <div className="column is-3"/>
                    </div>

                </div>

            </div>
        )
    }
}

export default ToDo;