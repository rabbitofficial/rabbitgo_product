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

class AmazonS3 extends BaseController
{
    private $key_id = '';
    private $access_key = '';

    public function index(Request $request)
    {
        $file = request()->file('file');
        // var_dump($file);
        $savename = \think\facade\Filesystem::putFile( 'topic', $file);

        
        $fullpath = app()->getRootPath().'runtime/storage/'.$savename;

        $filename = $request->param('name');
        $filepath = $fullpath;
        set_time_limit(0);
        $awsConfig = array(
            'version' => '',
            'acl' => '',
            'bucket' => '',
            'region' => '',
            'key_id' => $this->key_id,
            'access_key' => $this->access_key,
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
            'Key'                  => 'courses/' . $filename,
            'SourceFile'           => $filepath,
            'ACL' => $awsConfig['acl'],
        ];
        try {
            $result = $s3->putObject($config);
            // var_dump($result);
        } catch (Exception $exception) {
            echo "Failed to upload $filepath with error: " . $exception->getMessage();
            exit("Please fix error with file upload before continuing.");
        }

        $re = new ReturnJson(['src'=>($result->toArray())['ObjectURL']]);
        return json($re->json);
    }

    public function list(Request $request)
    {
        /* $re = new ReturnJson(["mgs" => "duoduo1222"]);
        return json_encode($re->json); */
        set_time_limit(0);
        $awsConfig = array(
            'version' => '',
            'acl' => '',
            'bucket' => '',
            'region' => '',
            'key_id' => $this->key_id, //Access key ID
            'access_key' => $this->access_key, //Secret access key
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

        $finalArray = [];
        try {
            $objects = $s3->listObjectsV2([
                'Bucket' => '',
            ]);
            foreach ($objects['Contents'] as $object) {
                if($object['Key'] != 'courses/') {
                    array_push(
                        $finalArray, 
                        [
                            'src' => 'https://rabbitgoapp.s3.ap-northeast-1.amazonaws.com/'.$object['Key'],
                            'createtime' => str_replace('.000000','',((array)($object['LastModified']))["date"])
                        ]);
                }
            }
            
            // var_dump((array)($object['LastModified']));
            $re = new ReturnJson($finalArray);
            return json($re->json);
        } catch (Exception $exception) {
            echo "Failed to upload with error: " . $exception->getMessage();
            exit("Please fix error with file upload before continuing.");
        }
        //return $result;
    }
}
