import React from 'react';
import './Sort.css';
import { Dropdown, DropdownButton} from 'react-bootstrap';

class Sort extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            sortby: "",
        }

        this.changeSort = this.changeSort.bind(this)
    }

    changeSort(event) {

        this.setState({
            sortby: event
        })

        let currentUrl = window.location.href;
        let string;
        for (const phrase of ["&sortBy=date:asc","&sortBy=date:desc","&sortBy=category:asc","&sortBy=category:desc"])
        {
            string = currentUrl;
            currentUrl = string.replace(phrase,'');
        }
        window.location.href = currentUrl.concat("&sortBy=",event)
    }

    render() {
        return(
                <div style={{ display: "flex", justifyContent: "center"}}>
                    <DropdownButton id="sort-search" title="SORT BY" variant="" className="myButton-light">
                        <Dropdown.Item eventKey="date:desc" onSelect={this.changeSort}>
                            Newest</Dropdown.Item>
                        <Dropdown.Item eventKey="date:asc" onSelect={this.changeSort}>
                            Oldest</Dropdown.Item>
                        <Dropdown.Item eventKey="category:asc" onSelect={this.changeSort}>
                            Category (A-Z)</Dropdown.Item>
                        <Dropdown.Item eventKey="category:desc" onSelect={this.changeSort}>
                            Category (Z-A)</Dropdown.Item>
                    </DropdownButton>
            </div>
        );
    }
}

export default Sort