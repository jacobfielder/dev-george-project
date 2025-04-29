$(document).ready(
  function(){
 // code goes here
  
    $("#saveParking").on("click", function(){
    // call f/n
      let statusText = underConstruction("not ready");
      
    //update the status
    $("#saveParking").text("not yet working.").prop(
"disabled", true);
    
    });
    
    function underConstruction(status){
      
      return "not yet ready"
    
      
    };
  
}
);