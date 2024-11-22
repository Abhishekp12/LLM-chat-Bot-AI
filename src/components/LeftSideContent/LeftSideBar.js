import React from 'react'
  import { BiPlus} from 'react-icons/bi';
  import './LeftSidebar.css';


const LeftSideBar = ({
    isShowSidebar=false,
    createNewChat=()=>{},
}) => {

  return (

         <section className={`sidebar ${isShowSidebar ? 'open' : ''}`}>
          <div className='sidebar-header' onClick={createNewChat} role='button'>
            <BiPlus size={20} />
            <button>New Chat</button>
          </div>
        </section>
 
  )
}

export default LeftSideBar
