<?php

namespace app\admin\controller;

use app\BaseController;
use app\admin\model\UserModel;
use think\Request;
use app\admin\validate\LoginValidate;
use think\exception\ValidateException;

use \Firebase\JWT\JWT; //导入JWT

class Transaction extends BaseController
{
    public function login(Request $request)
    {

        //如果是options请求，就结束执行下面语句
        if ($request->method() == 'OPTIONS') {
            //exit是用来结束程序执行的,如果参数是字符串，PHP将会直接把字符串输出，
            //如果参数是整型（范围是0-254），那个参数将会被作为结束状态使用。
            //dump($request);
            exit('options类型的请求，结束');
        }

        $info = [];
        $data = $request->post();

        //dump($data);
        try {
            validate(LoginValidate::class)->check($data);
            $password = UserModel::where('username', '=', $data['username'])->field('password')->find();
            if ($data['password'] == $password->password) {
                $token = UserModel::where('username', '=', $data['username'])->field('token')->find();
                $info = ["code" => 20000, "data" => ["status" => "OK", "msg" => "登陆成功", "token" => $token->token]];
            } else {
                $info = ["code" => 400, "data" => ["status" => "Bad", "msg" => "用户名或者密码错误"]];
            }

            return json($info);
        } catch (ValidateException $e) {
            // 验证失败 输出错误信息
            //dump($e->getError());
            $info = ["code" => 400, "data" => ["status" => "Bad", "msg" => $e->getError()]];
            return json($info);
        }
    }

    public function list(Request $request)
    {

        //如果是options请求，就结束执行下面语句
        if ($request->method() == 'OPTIONS') {
            //exit是用来结束程序执行的,如果参数是字符串，PHP将会直接把字符串输出，
            //如果参数是整型（范围是0-254），那个参数将会被作为结束状态使用。
            //dump($request);
            exit('options类型的请求，结束');
        }

        $date = date_create();

        /* $info = [
            "code" => 20000,
            "data" => [
                "total" => 20,
                "items" => [
                    "order_no" => '@guid()',
                    "timestamp" => date_timestamp_get($date),
                    "username" => '@name()',
                    "price" => '@float(1000, 15000, 0, 2)',
                    'status|1' => ['success', 'pending']
                ]
            ]
        ]; */

        $info = '{
            "code": 20000,
            "data": {
                "total": 20,
                "items": [
                    {
                        "order_no": "EQD-C6COdsseTWPopCHabjgT2x9xgxjEMzW9k-611PJ0RK3s",
                        "timestamp": 970952323501,
                        "username": "Jennifer Clark",
                        "price": 13408.1,
                        "status": "pending"
                    },
                    {
                        "order_no": "EQD-C6COdsseTWPopCHabjgT2x9xgxjEMzW9k-611PJ0RK3s",
                        "timestamp": 970952323501,
                        "username": "Sharon Williams",
                        "price": 11093,
                        "status": "pending"
                    },
                    {
                        "order_no": "EQD-C6COdsseTWPopCHabjgT2x9xgxjEMzW9k-611PJ0RK3s",
                        "timestamp": 970952323501,
                        "username": "Richard Lopez",
                        "price": 1830,
                        "status": "success"
                    },
                    {
                        "order_no": "EQD-C6COdsseTWPopCHabjgT2x9xgxjEMzW9k-611PJ0RK3s",
                        "timestamp": 970952323501,
                        "username": "Richard Lopez",
                        "price": 1830,
                        "status": "success"
                    },
                    {
                        "order_no": "EQD-C6COdsseTWPopCHabjgT2x9xgxjEMzW9k-611PJ0RK3s",
                        "timestamp": 970952323501,
                        "username": "Richard Lopez",
                        "price": 1830,
                        "status": "success"
                    },
                    {
                        "order_no": "EQD-C6COdsseTWPopCHabjgT2x9xgxjEMzW9k-611PJ0RK3s",
                        "timestamp": 970952323501,
                        "username": "Richard Lopez",
                        "price": 1830,
                        "status": "success"
                    },
                    {
                        "order_no": "EQD-C6COdsseTWPopCHabjgT2x9xgxjEMzW9k-611PJ0RK3s",
                        "timestamp": 970952323501,
                        "username": "Richard Lopez",
                        "price": 1830,
                        "status": "success"
                    }
                    
                ]
            }
        }';


        return json(json_decode($info));
    }
}
