<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Tuupola\Middleware\HttpBasicAuthentication;
use \Firebase\JWT\JWT;

require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../bootstrap.php';

const JWT_SECRET = "makey1234567";

$app = AppFactory::create();

function getPayload()
{
    $issuedAt = time();
    $expirationTime = $issuedAt + 600;
    $userid = 1;
    $email = "test@admin.com";
    $pseudo = "XX_Shadow_XX";
    return array(
        'userid' => $userid,
        'email' => $email,
        'pseudo' => $pseudo,
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );
}

$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET,
    "path" => ["/api"],
    "ignore" => ["/api/hello", "/api/login"],
    "error" => function ($response, $arguments) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];

$app->get('/api/hello/{name}', function (Request $request, Response $response, $args) {
    $array = [];
    $array["nom"] = $args['name'];
    $response->getBody()->write(json_encode($array));
    return $response;
});

$app->post('/api/login', function (Request $request, Response $response, $args) {
    global $entityManager;
    $inputJSON = file_get_contents('php://input');
    $body = json_decode( $inputJSON, TRUE );
    $token_jwt = JWT::encode(getPayload(), JWT_SECRET, "HS256");

    $userRepository = $entityManager->getRepository('Client');
    $user = $userRepository->findOneBy(array('login' => $body['login'], 'password' => $body['password']));
	
	if(!isset($body['login']) || !isset($body['password']) ){
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'You must provide a login and a password');
        $response = $response->withStatus(401);
        $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
	}	
    else if($utilisateur and $body['login'] == $utilisateur['login'] and $body['password'] == $utilisateur['password']){
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'wrong login and password');
        $response = $response->withStatus(401);
        $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
	else{
        $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
    }
	
    return $response;
});

$app->get('/api/user', function (Request $request, Response $response, $args) {
    $data = array('nom' => 'toto', 'prenom' => 'titi', 'adresse' => '6 rue des fleurs', 'tel' => '0606060607');
    $response->getBody()->write(json_encode($data));

    return $response;
});

#region products

//get all product from ./mock/products.json   a
$app->get('/api/product', function (Request $request, Response $response, $args) {
    global $entityManager;
    $products = $entityManager->getRepository('Product')->findAll();
    $response->getBody()->write($products);
    return $response;
});

//get product by id
$app->get('/api/product/{id}', function (Request $request, Response $response, $args) {
    global $entityManager;
    $product = $entityManager->getRepository('Product')->findOneBy(array('id' => $args['id']));
    $response->getBody()->write(json_encode ($array));
    return $response;
});

//get product by term 
$app->get('/api/product/term/{term}', function (Request $request, Response $response, $args) {
    global $entityManager;
    $products = $entityManager->getRepository('Product')->findAll();
    $id = $args ['term'];
    $newArray = [];
    foreach ($products as $key => $value) {
        if (strpos($value['name'], $id) !== false || strpos($value['description'], $id) !== false) {
            $newArray[] = $value;
        }
    }
    $response->getBody()->write(json_encode ($newArray));
    return $response;
});


$app->post('/api/product', function (Request $request, Response $response, $args) {
    $inputJSON = file_get_contents('php://input');
    $body = json_decode( $inputJSON, TRUE ); 
    $id = $body ['id'] ?? "";
    $name = $body ['name'] ?? ""; 
    $description = $body ['description'] ?? "";
    $price = $body ['price'] ?? "";
    $err=false;

    //check format name, price, description
    if (empty($name) || empty($price) || empty($description) || 
    !preg_match("/^[a-zA-Z0-9]+$/", $name) || !preg_match("/^[0-9]+$/", $price) ||
    !preg_match("/^[a-zA-Z0-9]+$/", $description)) {
        $err=true;
    }

    if (!$err) {
        global $entityManager;
        $product = new Product;
        $product->setName($name);
        $product->setPrice($price);
        $product->setDescription($description);
        $entityManager->persist($product);
        $entityManager->flush();
        $response->getBody()->write(json_encode ($product));
    }
    else{          
        $response = $response->withStatus(401);
    }
    return $response;
});

#endregion

#region client

//get all client
$app->get('/api/client', function (Request $request, Response $response, $args) {
    global $entityManager;
    $clients = $entityManager->getRepository('Client')->findAll();
    $response->getBody()->write(json_encode($clients));
    return $response;
});

//get client by id
$app->get('/api/client/{id}', function (Request $request, Response $response, $args) {
    global $entityManager;
    $client = $entityManager->getRepository('Client')->findOneBy(array('id' => $args['id']));
    $response->getBody()->write(json_encode ($client));
    return $response;
});


//add client
$app->post('/api/client', function (Request $request, Response $response, $args) {
    $inputJSON = file_get_contents('php://input');
    $body = json_decode( $inputJSON, TRUE );
    $lastName = $body ['lastname'] ?? ""; 
    $firstName = $body ['firstname'] ?? "";
    $email = $body ['email'] ?? "";
    $phone = $body ['phone'] ?? "";
    $address = $body ['address'] ?? "";
    $city = $body ['city'] ?? "";
    $zipcode = $body ['zipcode'] ?? "";
    $country = $body ['country'] ?? "";
    $login = $body ['login'] ?? "";
    $password = $body ['password'] ?? "";
    $gender = $body ['gender'] ?? "";
    $err=false;
    
    if (!$err) {
        global $entityManager;
        $client = new Client;
        $client->setLastname($lastName);
        $client->setFirstname($firstName);
        $client->setEmail($email);
        $client->setPhone($phone);
        $client->setAddress($address);
        $client->setCity($city);
        $client->setZipcode($zipcode);
        $client->setCountry($country);
        $client->setLogin($login);
        $client->setPassword($password);
        $client->setGender($gender);
        $entityManager->persist($client);
        $entityManager->flush();
        $response = addHeaders($response);
        $response->getBody()->write(json_encode ($client));
    }
    else{          
        //401 with error message
        $response = $response->withStatus(401);
        $response->getBody()->write(json_encode ($err));

    }
    return $response;
});

//delete client
$app->delete('/api/client/{id}', function (Request $request, Response $response, $args) {
    $id = $args ['id'];
    global $entityManager;
    $client = $entityManager->find('Client', $id);
    $entityManager->remove($client);
    $entityManager->flush();
    $response->getBody()->write(json_encode ($client));
    return $response;
});

#endregion

$app->add(new Tuupola\Middleware\JwtAuthentication($options));
$app->add(new Tuupola\Middleware\CorsMiddleware([
    "origin" => ["*"],
    "methods" => ["GET", "POST", "PUT", "PATCH", "DELETE"],
    "headers.allow" => ["Authorization", "Content-Type"],
    "headers.expose" => ["Authorization"],
]));
$app->run();
