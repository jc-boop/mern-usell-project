import React from 'react'
import './HeroSection.css'

class Searchbar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            keyword: ""
        }
        this.changeKeyword = this.changeKeyword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        
    }

    changeKeyword(event){
        this.setState({
          keyword:event.target.value
        })
      }

    onSubmit(event){
    event.preventDefault()
    const currentURL = window.location.href
    let sortOption = "";
    for (const phrase of ["&sortBy=date:asc","&sortBy=date:desc","&sortBy=category:asc","&sortBy=category:desc"])
        {
            if (currentURL.includes(phrase))
            {
                sortOption = phrase
            }
        }
    window.location.href = "/listings/"+this.state.keyword+sortOption
    }

    render() {
        return (
            <div class ="barHolder mt-1 text-center">
                <form onSubmit={this.onSubmit}>
                    <input class="searchbar-input" 
                    type="string" 
                    placeholder="Look for something!"
                    value={this.state.keyword}
                    onChange={this.changeKeyword}
                    />
                    
                    <button 
                    type="button" 
                    class="myButton"
                    onClick={this.onSubmit}
                    >Search</button>
                </form>
            </div>       
        )
    }
}
export default Searchbar