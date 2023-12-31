import React from 'react';

const Header: React.FC = () => {
  return (
    <header id="top-nav" className="navbar navbar-inverse navbar-static-top">

      
<div
 
>

        
<div
 
className="navbar-header">

          
<button
 
type="button"
 
className="navbar-toggle"
 
data-toggle="collapse"
 
data-target=".navbar-collapse">

            
<span
 
className="icon-toggle"></span>

          
</button>

          
<a
 
className="navbar-brand" href="#">Aplication</a>

        
</div>

        
<div
 
className="navbar-collapse collapse">

          
<ul
 
className="nav navbar-nav navbar-right">

            
<li
 
className="dropdown">

              
<a

                
className="dropdown-toggle"

                
role="button"

                
data-toggle="dropdown"

                
href="#"
              >

                
<i
 
className="glyphicon glyphicon-user"></i> Admin <span
 
className="caret"></span>

              
</a>

              
<ul
 
id="g-account-menu"
 
className="dropdown-menu"
 
role="menu">

                
<li><a
 
href="#">My Profile</a></li>
                <li><a href="#"><i className="glyphicon glyphicon-lock"></i> Logout</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;