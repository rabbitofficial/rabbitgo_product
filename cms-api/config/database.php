<?php

return [
    // 默认使用的数据库连接配置
    'default'         => env('database.driver', 'mysql'),

    // 自定义时间查询规则
    'time_query_rule' => [],

    // 自动写入时间戳字段
    // true为自动识别类型 false关闭
    // 字符串则明确指定时间字段类型 支持 int timestamp datetime date
    'auto_timestamp'  => true,

    // 时间字段取出后的默认时间格式
    'datetime_format' => 'Y-m-d H:i:s',

    // 数据库连接配置信息
    'connections'     => [
        'mysql' => [

            'type'              => env('database.type', ''),
         
            'hostname'          => env('database.hostname', ''),
            // 'hostname'          => env('database.hostname', '127.0.0.1'),
            
            'database'          => env('database.database', ''),
          
            'username'          => env('database.username', ''),
           
            'password'          => env('database.password', ''),
           
            // 'hostport'          => env('database.hostport', ''),
            'hostport'          => env('database.hostport', ''),
           
            'params'            => [],
       
            'charset'           => env('database.charset', 'utf8'),
        
            'prefix'            => env('database.prefix', ''),


            'deploy'            => 0,

            'rw_separate'       => false,

            'master_num'        => 1,

            'slave_no'          => '',

            'fields_strict'     => true,
 
            'break_reconnect'   => false,
            // 监听SQL
            'trigger_sql'       => env('app_debug', true),
            // 开启字段缓存
            'fields_cache'      => false,
            // 字段缓存路径
            'schema_cache_path' => app()->getRuntimePath() . 'schema' . DIRECTORY_SEPARATOR,
        ],
        'app_data' => [

            'type'            => 'mysql',

            // 'hostname'        => '127.0.0.1',
            'hostname'        => '',

           //'username'        => 'root',
            'username'        => '',

            'password'        => '',
            // 'password'        => '',
            'database'        => '',

            // 'hostport'        => ''
            'hostport'        => '3306'
        ]
        // 更多的数据库配置信息
    ],
];
