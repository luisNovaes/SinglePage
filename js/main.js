/**
* Inicializamos o angular.module com o mesmo nome que definimos na diretiva ng-app
* E incluímos a dependência do ngRoute 
*/
var app = angular.module('website', [
    'ngRoute'
]);

/**
 * Como possuímos a variavel app definida acima com a inicialização do Angular
 * através do app.config conseguimos criar as configurações
 * definimos que essa configuração depende do $routeProvider e usamos na function($routeProvider)
 */
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider

        // aqui dizemos quando estivernos na url / vamos carregar o conteúdo da pagina inicila a home
        // no segundo parametro definimos um objeto contendo o templateUrl da nossa pagina home e o controller que irá
        // preparar o conteudo e processar outros eventos da página que veremos posteriormente
        .when("/", { templateUrl: "templates/home.html", controller: "HomeCtrl" })
        // configuração das rotas bem parecidas para as outras paginas
        .when("/sobre", { templateUrl: "templates/sobre.html", controller: "SobreCtrl" })
        .when("/servicos", { templateUrl: "templates/servicos.html", controller: "ServicosCtrl" })
        .when("/precos", { templateUrl: "templates/precos.html", controller: "PrecosCtrl" })
        /* aqui você pode adicionar rotas para outras paginas que desejar criar */
        .when("/contato", { templateUrl: "templates/contato.html", controller: "ContatoCtrl" })// nossa nova rota
        // por último dizemos se nenhuma url digitada for encontrada mostramos a página 404 que não existe no nosso servidor
        .otherwise("/404", { templateUrl: "templates/404.html" });
}]);

/*
 * Controller utilizado nesse exemplo para ativar a galeria e tooltips
 */
app.controller('HomeCtrl', function ($scope, $location) {

    // Activates the Carousel
    $('.carousel').carousel({
        interval: 5000
    });

    // Activates Tooltips for Social Links
    $('.tooltip-social').tooltip({
        selector: "a[data-toggle=tooltip]"
    })
});

app.controller('SobreCtrl', function ($scope, $location) {

});

app.controller('ServicosCtrl', function ($scope, $location) {

});

app.controller('PrecosCtrl', function ($scope, $location) {

});

app.controller('ContatoCtrl', function ($scope, $location, $http) {
    //criando o objeto em branco, porém após o submit todos os dados estaram nessa variável
    $scope.formData = {};
    //variavel para exibir ou não a mensagem que o email foi enviado
    $scope.emailEnviado = false;
    //variável para exibir mensagem de erro ao enviar o email
    $scope.emailNaoEnviado = false;

    //função que será usada para preparar os dados no formato que poderemos usar no servidor para envio do email
    var param = function (data) {
        var returnString = '';
        for (d in data) {
            if (data.hasOwnProperty(d))
                returnString += d + '=' + data[d] + '&';
        }
        // Remove o último & que não é necessário
        return returnString.slice(0, returnString.length - 1);
    };

    $scope.enviarEmail = function () {
        $http({
            method: 'POST',
            url: 'email.php',
            data: param($scope.formData),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            //função de callback quando a promise for sucesso
            .success(function (data) {
                //verifica o retorno do servidor se o email foi enviado
                if (data.enviado) {
                    $scope.emailEnviado = true; //ocultamos o formulário e exibimos mensagem de sucesso
                } else {
                    $scope.emailNaoEnviado = true;
                }
            })
            //função de callback quando a promise for erro (geralmente problema de conexão ou página não existente)
            .error(function (error) {
                $scope.emailNaoEnviado = true;
            });
    };
});