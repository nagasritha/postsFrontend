import {Component} from 'react'
import {CirclesWithBar} from 'react-loader-spinner'
import DisplayContent from './Components/DisplayContent'
import './App.css'

class App extends Component{
  state={
    status:'loading',
    dataList:[],
  }

  componentDidMount(){
    this.getData()
  }

  getData=async()=>{
    this.setState({status:'loading'})
    const dataResponse=await fetch("https://expressfile-js.onrender.com/posts");
    if(dataResponse.status===200){
    const data=await dataResponse.json()
    console.log(data)
    const updatedList=data.map(item=>({
      id:item.id,
      username:item.username,
      postDescription:item.post_description,
      view:false
    }))
    this.setState({status:'success',dataList:updatedList})
  }else{
    this.setState({status:'failure'})
  }

  }

  updateView=(id)=>{
    const {dataList}=this.state
    const updatedList=dataList.map(item=>{
      if(item.id===id){
        return {...item,view:!item.view}
      }return item
    })
    this.setState({dataList:updatedList})
  }

  failure=()=><div className='bg'>
  <h2>Something went wrong, Please try again</h2>
  <button type='button' onClick={this.getData} className='pagination-buttons'>Retry</button>
</div>

loading=()=><div className='bg'>
<CirclesWithBar
height="100"
width="100"
color="#4fa94d"
wrapperStyle={{}}
wrapperClass=""
visible={true}
outerCircleColor=""
innerCircleColor=""
barColor=""
ariaLabel='circles-with-bar-loading'
/>
</div>

success=()=>{
const {dataList}=this.state
return <div className='bg'>
  <h1 className='postsh1'>POSTS</h1>
  {dataList.map(item=><DisplayContent updateView={this.updateView} key={item.id} itemDetails={item}/>)}
</div>

}


  render(){
    const {status}=this.state
    switch(status){
      case 'success':
        return this.success()
      case 'failure':
        return this.failure()
      case 'loading':
        return this.loading()
      default:
        return null     
    }
  }
}

export default App