import React, { Component } from "react";
import{ Checkbox} from "../components/Checkbox"

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

    draw_entries=()=>{
         return this.state.entries.map((entry ,i)=>(
            <div id={i} className="columns is-mobile ">
                <div className="column is-1 is-flex aic">
                    <Checkbox ischecked={entry.done}
                    onClick={() => this.toogle_state(i)}
                    />
            </div>
            <div className="column is-9 ">
                <label>{entry.name}</label>
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
    Add= () =>{
        let cur_entries=this.state.entries
        cur_entries.push({
            done:false,
            name:this.state.entry_title
        })
        this.setState({
            entries:cur_entries,
            entry_title:""
        })

    }
    toogle_state = (i) => {
        let cur_entries=this.state.entries
        cur_entries[i].done=!cur_entries[i].done
        this.setState({
            entries:cur_entries,

        })
      };
      delete= (i) =>{
        console.log("heya")
        let cur_entries=this.state.entries
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