import React from 'react';
import Feature from './Feature';
import "./Feature.css"

const featuresData = [
  {
    title: 'True to real trading',
  },
  {
    title: 'Build and test your strategies',
  },
  {
    title: 'Get to know your trading platform',
  },
];

const Features = () => (
//   <div className="d-flex justify-content-space-around" style={{width: '100vw'}} id="features">
//     <div className="col-md-6" id='subHeading'>
//       <h3 style={{ backgroundImage: 'linear-gradient(to right, #B030B0, #602080, #202060)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', fontWeight: "bold", fontSize : '30px', paddingLeft : '2vw' }}>The future is now and you just need to realize it. Step into future today and make it happen.</h3>
//     </div>
//     {/* <div className=" d-flex col-md-5"  >
//       {featuresData.map((item, index) => (
//         <Feature title={item.title}key={item.title + index} />
//       ))}
//     </div> */}
//   </div>
  <div className="container-fluid" style={{ width: '100vw' }} id="features">
  <div className="row d-flex justify-content-center">
    <div className="col-12 col-md-10" id='subHeading'>
      <h3 style={{
        backgroundImage: 'linear-gradient(to right, #B030B0, #602080, #202060)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        fontWeight: "bold",
        fontSize: '30px',
        padding: '1rem',
        wordWrap: 'break-word',
        overflow: 'hidden',
      }}>
        The future is now and you just need to realize it. Step into future today and make it happen.
      </h3>
    </div>
  </div>
</div>

);

export default Features;