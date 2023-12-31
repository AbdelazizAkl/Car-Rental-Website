import React from 'react';

const main : React.FC = () => {
  return (
    <div>
      <div className="row">
        <div className="col-md-3">
          {/* Left section */}
          <a href="#"><strong><i className="glyphicon glyphicon-briefcase"></i> Toolbox</strong></a>
          <hr />
          <ul className="nav nav-pills nav-stacked">
            <li><a href="#"><i className="glyphicon glyphicon-flash"></i> Alerts</a></li>
            <li><a href="#"><i className="glyphicon glyphicon-link"></i> Links</a></li>
            <li><a href="#"><i className="glyphicon glyphicon-list-alt"></i> Reports</a></li>
            <li><a href="#"><i className="glyphicon glyphicon-book"></i> Books</a></li>
            <li><a href="#"><i className="glyphicon glyphicon-briefcase"></i> Tools</a></li>
            <li><a href="#"><i className="glyphicon glyphicon-time"></i> Real-time</a></li>
            <li><a href="#"><i className="glyphicon glyphicon-plus"></i> Advanced..</a></li>
          </ul>
        </div>
        {/* ... other columns or content can be added here */}
      </div>
    </div>
  );
};

export default main;