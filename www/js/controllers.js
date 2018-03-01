angular.module('app.controllers', [])
  
.controller('pageCtrl', ['$scope', '$stateParams', '$cordovaCamera', function ($scope, $stateParams, $cordovaCamera) {
    $scope.data={image:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/220px-SNice.svg.png"}


$scope.captureImage=function(){
    
      document.addEventListener("deviceready", function () {

    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      saveToPhotoAlbum: false,
	  correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {

      $scope.data.image= "data:image/jpeg;base64," + imageData;
	     
	    
    }, function(err) {
      // error
    });

  }, false);
}


$scope.openImage=function(){
  document.addEventListener("deviceready", function () {

    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }

    $cordovaCamera.getPicture(options).then(function(imageURI) {

       $scope.data.image = imageURI;

var testImage = new Image;	    
testImage.onload = function() {
    var canvas = document.createElement("canvas");
    canvas.width = testImage.width();
    canvas.height = testImage.height();
    var ctx = canvas.getContext('2d');
    ctx.drawImage(testImage, 0, 0);
    var dataUri = canvas.toDataURL('image/png');
    $scope.data.testimage= 'data:image/png;base64,' + dataUri;				  
};
testImage.src = imageURI;   	    
       
    }, function(err) {
      // error
    });


    //$cordovaCamera.cleanup().then(); /* only for FILE_URI*/

  }, false);

}

}])
 
