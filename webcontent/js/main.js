/*******************************************************************************
 * Efarma AngularJS App Main Script
 ******************************************************************************/

var dependencias = [ 'ngStorage', 'ui.router', 'ui.bootstrap', 'oc.lazyLoad',
		'ngSanitize', 'datatables', 'datatables.buttons',
		'datatables.columnfilter', 'datetimepicker', 'ui.calendar',
		'ngFileUpload', 'pascalprecht.translate', 'oitozero.ngSweetAlert' ];

/* Efarma App */
dependencias.push('ngMockE2E');
var EfarmaApp = angular.module("EfarmaApp", dependencias);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
EfarmaApp.config([ '$ocLazyLoadProvider', function($ocLazyLoadProvider) {
	$ocLazyLoadProvider.config({
	// global configs go here
	});
} ]);

// AngularJS v1.3.x workaround for old style controller declarition in HTML
EfarmaApp.config([ '$controllerProvider', function($controllerProvider) {
	// this option might be handy for migrating old apps, but please don't use
	// it
	// in new ones!
	$controllerProvider.allowGlobals();
} ]);

/*******************************************************************************
 * END: BREAKING CHANGE in AngularJS v1.3.x:
 ******************************************************************************/

/* Setup global settings */
EfarmaApp.factory('settings', [ '$rootScope', function($rootScope) {
	// supported languages
	var settings = {
		layout : {
			pageSidebarClosed : false, // sidebar menu state
			pageContentWhite : true, // set page content layout
			pageBodySolid : false, // solid body color state
			pageAutoScrollOnLoad : 1000
		// auto scroll to top on page load
		},
		assetsPath : 'assets',
		globalPath : 'assets/global',
		layoutPath : 'assets/layouts/layout',
	};

	$rootScope.settings = settings;
	return settings;
} ]);


/* Setup App Main Controller */
EfarmaApp.controller('AppController', [ '$scope', '$rootScope', '$translate',
		'$httpBackend', function($scope, $rootScope, $translate, $httpBackend) {

			$scope.root = $scope;

			$scope.root.cambiarIdioma = function(idioma) {
				$translate.use(idioma);
			}

			angular.module('ngMockE2E');
			$httpBackend.whenGET(function(url) {
				return (url.indexOf('views') !== -1);
			}).passThrough();
			$httpBackend.whenPOST(function(url) {
				return (url.indexOf('ip-api.com') !== -1);
			}).passThrough();

			$httpBackend.whenGET(function(url) {
				return (url.indexOf('tpl/') !== -1);
			}).passThrough();

			$scope.$on('$viewContentLoaded', function() {

			});
		} ]);

/* Setup Rounting For All Pages */
EfarmaApp
		.config([
				'$stateProvider',
				'$urlRouterProvider',
				'$locationProvider',
				'$translateProvider',
				function($stateProvider, $urlRouterProvider, $locationProvider,
						$translateProvider) {
					// Redirect any unmatched url
					$urlRouterProvider.otherwise("/login.html");

					$stateProvider

							.state(
									'login',
									{
										url : "/login.html",
										templateUrl : "views/login.html?ver="
												+ Math.random(),
										data : {
											pageTitle : 'Entrada al sistema'
										},
										controller : "LoginController"
									})

							.state(
									'menu',
									{
										templateUrl : "views/menu.html?ver="
												+ Math.random(),
										data : {
											pageTitle : 'Menú'
										},
										controller : "MenuController",
										resolve : {
											deps : [
													'$ocLazyLoad',
													function($ocLazyLoad) {
														return $ocLazyLoad
																.load({
																	name : 'EfarmaApp',
																	insertBefore : '#ng_load_plugins_before',
																	files : [
																			'css/animate.css',
																			'css/bootstrap.min.css',
																			'css/font-awesome.min.css',
																			'css/main.css',
																			'css/prettyPhoto.css',
                                                                            'css/price-range.css',
                                                                            'css/responsive.css' ]
																});
													} ]
										}
									})

							.state(
									'menu.inicio',
									{
										url : "/inicio.html",
										templateUrl : "views/inicio.html?ver="
												+ Math.random(),
										data : {
											pageTitle : 'Menú de inicio'
										},
										controller : "InicioController"

									})
							.state(
									'menu.gestorInicio',
									{
										url : "/gestorInicio.html",
										templateUrl : "views/gestorInicio.html?ver="
												+ Math.random(),
										data : {
											pageTitle : 'Menú de inicio'
										},
										controller : "GestorInicioController"

									})
							.state(
									'menu.crea',
									{
										url : "/crea.html",
										templateUrl : "views/crea.html?ver="
												+ Math.random(),
										data : {
											pageTitle : 'Menú de inicio'
										},
										controller : "CrearController"

									})
							.state(
									'menu.facturacionBancaria',
									{
										url : "/facturacionBancaria.html",
										templateUrl : "views/facturacionBancaria.html?ver="
												+ Math.random(),
										data : {
											pageTitle : 'Menú de inicio'
										},
										controller : "FacturacionController"
									})
							.state(
									'menu.titular',
									{
										url : "/datos.html",
										templateUrl : "views/datos.html?ver="
												+ Math.random(),
										data : {
											pageTitle : 'Menú de inicio'
										},
										controller : "DatosController"
									})
							.state(
									'menu.factura',
									{
										url : "/facturacion.html",
										templateUrl : "views/facturacion.html?ver="
												+ Math.random(),
										data : {
											pageTitle : 'Menú de inicio'
										},
										controller : "DatosController"
									})
							.state(
									'menu.envio',
									{
										url : "/envio.html",
										templateUrl : "views/envio.html?ver="
												+ Math.random(),
										data : {
											pageTitle : 'Menú de inicio'
										},
										controller : "DatosController"
									})
							.state(
									'menu.pagador',
									{
										url : "/pagador.html",
										templateUrl : "views/pagador.html?ver="
												+ Math.random(),
										data : {
											pageTitle : 'Menú de inicio'
										},
										controller : "DatosController"
									})
							.state(
									'menu.contrato',
									{ // Ruta para la informacion Contratos
										url : "/contratos.html",
										templateUrl : "views/contratos.html?ver="
												+ Math.random(),
										data : {
											pageTitle : 'Informacion Contratos'
										},
										controller : "ContratoController"
									})
							.state(
									'menu.detalleFactura',
									{
										url : "/detalles.html",
										templateUrl : "views/detalleFactura.html?ver="
												+ Math.random(),
										data : {
											pageTitle : 'Menú de inicio'
										},
										controller : "FacturaDetalleController"
									}).state('menu.sugerencias',{ //Ruta para la informacion de Sugerencias
										url:"/sugerencias.html",
										templateUrl:"views/sugerencias.html?ver="+Math.random(),
										data:{
											pageTitle:'Informacion Sugerencias'
										},
										controller:"SugerenciasController"
									}).state(
									'menu.gestorSugerencias',
									{
										url : "/gestorSugerencias.html",
										templateUrl : "views/gestorSugerencia.html?ver="
												+ Math.random(),
										data : {
											pageTitle : 'Menú de inicio'
										},
										controller : "GestorSugerenciaController"

									});

					$translateProvider
							.useSanitizeValueStrategy('escapeParameters');
					$translateProvider.translations("es-es", es_es);
					$translateProvider.translations("en-us", en_us);
					$translateProvider.translations("cn", cn);

				} ]);

/* Init global settings and run the app */
EfarmaApp
		.run([
				"$rootScope",
				"settings",
				"$state",
				"$window",
				"$translate",
				function($rootScope, settings, $state, $window, $translate) {
					$rootScope.$state = $state; // state to be accessed from
					// view
					$rootScope.$settings = settings; // state to be accessed
					// from
					var language = ($window.navigator.userLanguage || $window.navigator.language);
					if (language.indexOf("en") == 0)
						$translate.use("en-us");
					else if (language.indexOf("cn") == 0)
						$translate.use("cn");
					else
						$translate.use("es-es");
				} ]);
