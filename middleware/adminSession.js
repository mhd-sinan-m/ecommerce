const adminSession=(req,res,next)=>{
    const adminIsAuthenticated=req.session.admin
  if (adminIsAuthenticated) {
    next();
  } else {
    res.status(401).redirect('/signin'); 
    // window.alert('you are not admin')
  }
}

module.exports=adminSession