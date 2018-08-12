// const loginRedirect = () => `
//   <div>
//     <script>
//       const targetWindow = window.opener;
//       targetWindow.postMessage({ type: 'login', success: true }, '*'); 
//     </script>
//   </div>
// `;

export default (req, res) => {
  // const url = req.protocol + '://' + req.get('host');
  // res.send(loginRedirect());
};
