<?php

namespace app\app_data\controller;

use app\BaseController;
use app\utils\ReturnJson;
use think\facade\Db;
use think\Request;
use \Exception;

class Users extends BaseController
{
   public function index()
   {
      $re = new ReturnJson(["mgs" => "duoduo1"]);
      return json($re->json);
   }

   public function test()
   {

      $filepath = '/Users/geng/Desktop/others/background/city.png';
      set_time_limit(0);
      $awsConfig = array(
         'version' => '',
         'acl' => '',
         'bucket' => '', 
         'region' => '',
         'key_id' => "", //Access key ID
         'access_key' => "", //Secret access key
      );
      if (empty($awsConfig)) {
         echo "aws config error";
         exit;
      }
      
      $credentials = new Credentials(
         $awsConfig['key_id'],
         $awsConfig['access_key']
      );
      $s3 = new S3Client([
         'version' => $awsConfig['version'], 
         'region'  => $awsConfig['region'],
         'credentials' => $credentials,
      ]);

      $config = [
         'Bucket'               => $awsConfig['bucket'],
         'Key'                  => 'courses/city.png', //亚马逊静态资源服务器上的路径
         'SourceFile'           => $filepath, //原文件路径
         'ACL' => $awsConfig['acl'], //权限
      ];
      try {
         $result = $s3->putObject($config);
      } catch (Exception $exception) {
         echo "Failed to upload $filepath with error: " . $exception->getMessage();
         exit("Please fix error with file upload before continuing.");
      }
      return $result;
   }

   public function getName()
   {

      $list = Db::connect('app_data')->table('wallets')->field('id,wallet')->select();
      echo json($list);
   }

   public function userList()
   {

      $list = Db::connect('app_data')->table('wallets')->select();

      $re = new ReturnJson($list);
      return json($re->json);
   }
}
