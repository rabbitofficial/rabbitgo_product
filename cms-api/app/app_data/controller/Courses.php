<?php

namespace app\app_data\controller;

use app\BaseController;
use app\utils\ReturnJson;
use think\facade\Db;
use think\Request;
use \Exception;

use Aws\S3\S3Client;
use Aws\Exception\AwsException;
use Aws\Credentials\Credentials;
use Aws\S3\MultipartUploader;
use Aws\Exception\MultipartUploadException;
use Aws\Command;

class Courses extends BaseController
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
         'Key'                  => 'courses/city.png',
         'SourceFile'           => $filepath,
         'ACL' => $awsConfig['acl'],
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

   public function createCourse(Request $request)
   {
      if ($request->method() == 'OPTIONS') {
         exit('options type request, ended');
      }

      $title = $request->param('title');
      $description = $request->param('description');
      $ranking = $request->param('ranking');

      $list = Db::connect('app_data')->table('courses')->where('title', $title)->findOrEmpty();
      if (count($list) == 0) {

         $result = Db::connect('app_data')->name('courses')->insert(["title" => $title, "description" => $description, "ranking" => $ranking]);
         if ($result) {
            $re = new ReturnJson(["title" => $title, "description" => $description, "ranking" => $ranking, "msg" => "Add successfully"]);
            return json($re->json);
         } else {
            $re = new ReturnJson(["title" => $title, "description" => $description, "ranking" => $ranking, "msg" => "Add failed!"]);
            return json($re->json);
         }
      } else {
         $re = new ReturnJson(["name" => $title, "description" => $description, "msg" => "Failed, title exist!"]);
         return json($re->json);
      }
   }

   public function deteleCourse(Request $request)
   {

      $id = $request->param('id');

      $result = Db::connect('app_data')->table('courses')->where('id', $id)->delete();
      if ($result) {
         $re = new ReturnJson(["msg" => "Delate successfully"]);
         return json($re->json);
      } else {
         $re = new ReturnJson(["msg" => "Delate failed!"]);
         return json($re->json);
      }
   }

   public function editCourse(Request $request)
   {

      if ($request->method() == 'OPTIONS') {
         exit('options type request, ended');
      }

      $title = $request->param('title');
      $description = $request->param('description');
      $id = $request->param('id');
      $ranking = $request->param('ranking');

      $result = Db::connect('app_data')->name('courses')->where('id', $id)->update(["title" => $title, "description" => $description, "ranking" => $ranking]);
      if ($result) {
         $re = new ReturnJson(["title" => $title, "description" => $description, "msg" => "Update successfully"]);
         return json($re->json);
      } else {
         $re = new ReturnJson(["title" => $title, "description" => $description, "msg" => "Update failed!"]);
         return json($re->json);
      }
   }



   public function courseList()
   {

      $list = Db::connect('app_data')->table('courses')->field('id,title, createtime, updatetime, description, ranking')->order('ranking', 'desc')->select();

      $re = new ReturnJson($list);
      return json($re->json);
   }



   //lesson
   public function createLesson(Request $request)
   {

      if ($request->method() == 'OPTIONS') {
         exit('options type request, ended');
      }

      $title = $request->param('title');
      $tokenAward = $request->param('tokenAward');
      $course_id = $request->param('course_id');
      $content = $request->param('content');

      $list = Db::connect('app_data')->table('lessons')->where('title', $title)->findOrEmpty();
      if (count($list) == 0) {

         $result = Db::connect('app_data')->name('lessons')->insert(["title" => $title, "tokenAward" => $tokenAward, "course_id" => $course_id,"content" => $content]);
         if ($result) {
            $re = new ReturnJson(["title" => $title, "msg" => "Add successfully"]);
            return json($re->json);
         } else {
            $re = new ReturnJson(["title" => $title, "msg" => "Add failed!"]);
            return json($re->json);
         }
      } else {
         $re = new ReturnJson(["name" => $title, "msg" => "Failed, title exist!"]);
         return json($re->json);
      }
   }

   public function deleteLesson(Request $request)
   {

      $id = $request->param('id');

      $result = Db::connect('app_data')->table('lessons')->where('id', $id)->delete();
      if ($result) {
         $re = new ReturnJson(["msg" => "Delate successfully"]);
         return json($re->json);
      } else {
         $re = new ReturnJson(["msg" => "Delate failed!"]);
         return json($re->json);
      }
   }

   public function editLesson(Request $request)
   {

      if ($request->method() == 'OPTIONS') {
         exit('options type request, ended');
      }

      $title = $request->param('title');
      $tokenAward = $request->param('tokenAward');
      $id = $request->param('id');
      $course_id = $request->param('course_id');
      $content = $request->param('content');

      $result = Db::connect('app_data')->name('lessons')->where('id', $id)->update(["title" => $title, "tokenAward" => $tokenAward, "course_id" => $course_id,"content" => $content]);
      if ($result) {
         $re = new ReturnJson(["title" => $title,  "msg" => "Update successfully"]);
         return json($re->json);
      } else {
         $re = new ReturnJson(["title" => $title,  "msg" => "Update failed!"]);
         return json($re->json);
      }
   }

   public function lessonList(Request $request)
   {
      if ($request->method() == 'OPTIONS') {
         exit('options type request, ended');
      }

      $course_id = $request->param('course_id');

      $list = Db::connect('app_data')->query('select l.id,l.title,l.content,l.createtime,l.tokenAward, l.course_id, c.title as courseTitle from lessons as l, courses as c where l.course_id = c.id and l.course_id ='.$course_id);
      $re = new ReturnJson($list);
      return json($re->json);
   }

   //quzi
   public function createQuiz()
   {

      $list = Db::connect('app_data')->table('wallets')->field('id,wallet')->select();
      echo json_encode($list);
   }

   public function deleteQuiz()
   {

      $list = Db::connect('app_data')->table('wallets')->field('id,wallet')->select();
      echo json_encode($list);
   }

   public function editQuiz()
   {

      $list = Db::connect('app_data')->table('wallets')->field('id,wallet')->select();
      echo json_encode($list);
   }

   public function getQuiz()
   {

      $list = Db::connect('app_data')->table('wallets')->field('id,wallet')->select();
      echo json_encode($list);
   }

   public function getQuizAns()
   {

      $list = Db::connect('app_data')->table('wallets')->field('id,wallet')->select();
      echo json_encode($list);
   }
}
