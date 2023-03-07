<?php

namespace app\vote\controller;

use app\BaseController;

class Index extends BaseController
{
    public function index()
    {
        return "vote";
    }

    public function hello($name = 'ThinkPHP6')
    {
        return 'hello2222,' . $name;
    }
}
