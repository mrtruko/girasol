Sces = new Mongo.Collection('sce');
People = new Meteor.Collection("people");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
if (Meteor.isClient) {

  // This code only runs on the client
  angular.module('control-luz',['angular-meteor']);

  angular.module('control-luz').controller('controlluz', ['$scope','$meteor',
    function ($scope,$meteor) {
      $scope.sce = $meteor.object(Sces, 'sistem1');
      console.log($scope.sce);
      $scope.apagarSistema = function(){
        if(!$scope.sce.sistem){
          $scope.sce.exterior = false;
          $scope.sce.dor1 = false;
          $scope.sce.dor2 = false;
          console.log($scope.sce.list);
        }
      }
      $scope.grafico = function(){
        Template.hello.rendered = function() {
          var chart = nv.models.lineChart()
                  .width(550).height(400)  //Adjust chart margins to give the x-axis some breathing room.
                  .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                  .transitionDuration(200)  //how fast do you want the lines to transition?
                  .showLegend(false)       //Show the legend, allowing users to turn on/off line series.
                  .showYAxis(true)        //Show the y-axis
                  .showXAxis(false)        //Show the x-axis
              ;

          this.autorun(function () {

            $scope.$watch('sce.list', function () {
              console.log($scope.sce.list.length);
              $scope.seg = 0;
              $scope.lista = [];
              angular.forEach($scope.sce.list,function(value,key){
                if($scope.seg>=$scope.sce.list.length - 20){
                  $scope.lista.push({"x":$scope.seg,"y":value});
                  console.log(value);
                }
                $scope.seg++;
              });
              console.log($scope.seg);
              d3.select('#chart svg').datum(
                  [{ values:$scope.lista}]
              ).call(chart);
              chart.color(["#FF0000"])
              chart.update();
            });



          });
        };


      }
    }])

}
