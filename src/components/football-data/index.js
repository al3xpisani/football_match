
import React, { Component } from "react";
import "./index.css";
const classNames = require('classnames');

export default class FootballMatchesData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedYear: null,
      firstFormLoading:true,
      footList:{
        page:0,
        per_page:0,
        total:null,
        total_pages:0,
        data:[]
      }
      
    };
  }

  async postData(url = '', data = {}) {
    const response = await fetch(url.concat('year=').concat(data.year),{
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    return response.json()
        // .then(async response => {
        //     const data = await response.json();
        //     console.log('data...',data)
        //     if (!response.ok) {
        //         console.log('error response')
        //         // get error message from body or default to response statusText
        //         const error = (data && data.message) || response.statusText;
        //         return Promise.reject(error);
        //     }
        //     // return data;
        // })
        .catch(error => {
            // this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });

  }

  onClick = (year) => (e) => {
    // Code written in next line is to take care of adding active class to selected year for css purpose.
    // this.setState({
    //   selectedYear: year
    // })

    this.postData('https://jsonmock.hackerrank.com/api/football_competitions?', { year }).then(data => {
        this.setState({ footList:data, selectedYear:year,firstFormLoading:false})
        console.log('json',data);
  });

  }

  render() {
    var years= [2011, 2012, 2013, 2014, 2015, 2016, 2017];
    const footList = this.state.footList
    const {total} = this.state.footList
    const {firstFormLoading} = this.state
    console.log('footlist',total)
    return (
      <div className="layout-row">
        <div className="section-title">Select Year</div>
        <ul className="sidebar" data-testid="year-list">
          {years.map((year, i) => {
            return (
              <li className={
                classNames({
                  'sidebar-item': true,
                  'active': this.state.selectedYear === year
                })
              }
              onClick={this.onClick(year)}
              key={year}>
                <a>{year}</a>
              </li>
            )
          })}
        </ul>
              <section className="content">
                      <section>
                        <div className="total-matches" data-testid="total-matches">{footList.data.length === 0 ? null: total}</div>
                 
              {footList.data.map((item,index)=>{
                  return (       
                      <div>
                            <ul className="mr-20 matches styled" data-testid="match-list">
                              <li className="slide-up-fade-in">Match {item.name} won by {item.winner}</li>
                            </ul>
                      </div>
              )})} 
                      </section>

                        {footList.data.length === 0 && !firstFormLoading ? 
                        <div data-testid="no-result" className="slide-up-fade-in no-result">No Matches Found</div> : null}
              </section>
     </div>
    )}
}