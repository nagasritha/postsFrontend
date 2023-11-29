import './index.css'

const DisplayContent=(props)=>{
    const {itemDetails,updateView}=props
    const {id,username,postDescription,view}=itemDetails
    const description=(postDescription.trim(" "))
    const title=description.split(" ")[0]
    const colors=["#06224f","#060f1f","#040126","#0c0275","#1905fa","#610256","#2b0327"]
    const randomNum=Math.ceil(Math.random()*6)
    const update=()=>updateView(id)
    console.log(randomNum)
    return <div className='post'>
        <div className='postDetails'>
        <p style={{"backgroundColor":colors[randomNum]}} className='profile'>{username.split("")[0]}</p>
        <h1 className='title'>{title}</h1>
        <button className='view' type='button' onClick={update}>View</button>
      </div>
      {view && <div className='description'>
        <p>{description}</p>
        <p style={{'textAlign':"right"}}><b>Posted by: </b>{username}</p>
        </div>}
    </div>
}

export default DisplayContent