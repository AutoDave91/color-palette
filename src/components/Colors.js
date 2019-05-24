import React from 'react'

function Colors(props){
return(<div>

     <div style={{border: 'solid 3px #5e85d4 ', display: 'flex', flexDirection:'column', alignItems: 'center'}} key={props.index}>
                    <div style={{backgroundColor: props.element.hex, width: '10vw', height:'5vh'}}>{props.element.hex}</div>
                    <h2>{props.element.name}</h2>
                    <img style={{height:'15vh', width: '15vh'}} src={props.element.img}/>
                </div>

</div>)
}

export default Colors