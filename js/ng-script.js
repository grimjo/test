var app = angular.module('componentsApp', []);

app.controller('componentController', function($scope, productComponentsService) {

    $scope.initialConfig = {};
    $scope.showCustomizer = false;
    $scope.config = {};
    $scope.renderImg = '';
    $scope.engraving = {};
    $scope.engraving.lines = [];
    $scope.engraving.config = {};
    $scope.components = [];

    $scope.init = function () {
        $scope.initialConfig = {};
        $scope.showCustomizer = false;
        $scope.config = {};
        $scope.renderImg = '';
        $scope.engraving = {};
        $scope.engraving.lines = [];
        $scope.engraving.config = {};
        $scope.components = [];

        angular.copy(productComponentsService.getComponents(), $scope.components);
        $scope.addLine();
        for (i = 0; i < $scope.components.length;i++) {
            $scope.selectOption($scope.components[i].id, $scope.components[i].selected);
        }
    };


    $scope.engraving.config.fonts = [
        {id:0, title:"Ariel", style:"ariel"},
        {id:1, title:"Cursive", style:"cursive"},
        {id:2, title:"Georgia", style:"georgia"},
        {id:3, title:"Times", style:"times"}
    ];

    $scope.setFont = function(lineId, fontId) {
        $scope.engravings.lines[lineId].font = $scope.engraving.config.fonts[fontId].style;
    }

    $scope.addLine = function() {
        $scope.engraving.lines.push({
            id: $scope.engraving.lines.length +1,
            value: '',
            font: '',
            weight: ''
        });
    }


    $scope.getPrice = function() {
        price = 5.00;
        for (p = 0; p < $scope.components.length; p++) {
            if (angular.isNumber($scope.components[p].selectedOption.price)) {
                price += $scope.components[p].selectedOption.price;
            }
        }
        return angular.isNumber(price) ? price : 0;
    }

    $scope.selectOption = function (componentId, sku) {

        $scope.components[componentId].selected = sku;

        for (n = 0; n < $scope.components[componentId].options.length; n++) {
            if ($scope.components[componentId].options[n].sku == sku) {
                $scope.components[componentId].selectedOption = $scope.components[componentId].options[n];
            }
        }

        $scope.config[$scope.components[componentId].title] = sku;

        customizer_render_img($scope.config.Mounting, $scope.config.Color, $scope.config.Shape);
        console.log($scope.config);
    }

    $scope.getSelectedOption = function(componentId) {

        for (i = 0; i < $scope.components[componentId].options.length;i++) {
            if ($scope.components[componentId].selected == $scope.components[componentId].options[i].sku) {
                return $scope.components[componentId].options[i].sku;
            }
        }
        return null;
    }

    $scope.enableCustomizer = function() {
        $scope.showCustomizer = true;
    }

    $scope.init();

});



app.service('productComponentsService', function() {
   this.getComponents = function() {
       return components;
   };

    this.insertComponent = function(title, options) {
        customers.push({
            id: components.length + 1,
            title: title,
            options: options
        });
    };

    this.getComponent = function (id) {
        return components[id];
    }

    var components = [
        {
            id: 0,
            title:'Color',
            options:[
                { title: 'Brass', price: 0.00, sku:'brs', stock:false, imgName:'brs'},
                { title: 'Aluminum', price: 0.50, sku:'alm', imgName:'alm'},
                { title: 'Black', price: 1.00, sku:'blk', imgName:'blk'}
            ],
            height:80,
            width:80,
            selected: 'brs'
        },
        {
            id:1,
            title:'Shape',
            options:[
                { title:'Rounded', price: 0.50, sku:'r', imgName:'rd'},
                { title:'Square',price: 0.00, sku:'s', imgName:'sq'},
                { title: 'Oval', price: 1.00, sku:'o', imgName:'ov'}
            ],
            selected: 'o'
        },
        {
            id:2,
            title:'Mounting',
            options:[
                {title:'glue', price: 0.00, sku:'n', imgName:'ns'},
                { title:'Two Screw', price: 1.00, sku:'2s', imgName:'2s'},
                { title: 'Four Screw', price: 2.00, sku:'4s', imgName:'4s'}
            ],
            selected: '2s'
        }
    ];

});

