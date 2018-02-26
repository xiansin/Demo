<?php
/**
 * Created by PhpStorm
 * FileName: index.php
 * User: JianJia.Zhou<jianjia.zhou@longmaster.com.cn>
 * DateTime: 2018/2/9 13:51
 */
require_once './resources/simple_html_dom.php';
require_once './UploadAvatar.php';

class BaiDuTieBaUserAvatarResources
{
    /**
     * @var null|simple_html_dom
     */
    protected $_simple_html_dom = null;
    /**
     * 获取HTML 支援
     *
     * @var bool|simple_html_dom
     */
    protected $_html_resources;
    /**
     * 分页总数
     *
     * @var int
     */
    private $_total = 0;
    /**
     * 头像列表地址
     *
     * @var mixed|string
     */
    private $_url = "http://tieba.baidu.com/bawu2/platform/listMemberInfo?word=php&pn=@pn";

    /**
     * BaiDuTieBaUserAvatarResources constructor.
     * @param int $page_num
     */
    public function __construct($page_num = 1)
    {
        $this->_url = str_replace("@pn", $page_num, $this->_url);
        // 实例化
        $this->_simple_html_dom = new simple_html_dom();
        // 加载url
        $this->_html_resources = file_get_html($this->_url);
        // 获取总数
        $this->_getTotal();

    }

    /**
     * @version             v1.0
     * @author              JianJia.Zhou<jianjia.zhou@longmaster.com.cn>
     * @changeTime          2018/2/25 10:05
     * @param string $name
     */
    public function __get($name)
    {
        return $this->$name;
        // TODO: Implement __get() method.
    }

    /**
     * 获取分页总数
     *
     * @version             v1.0
     * @author              JianJia.Zhou<jianjia.zhou@longmaster.com.cn>
     * @changeTime          2018/2/25 9:59
     */
    private function _getTotal()
    {
        $this->_total = $this->_html_resources->find("span.tbui_total_page", 0)->plaintext;

        preg_match('/\d+/i', $this->_total, $matches);

        $this->_total = $matches[0];
    }

    /**
     * 获取头像列表
     *
     * @version             v1.0
     * @author              JianJia.Zhou<jianjia.zhou@longmaster.com.cn>
     * @changeTime          dt
     * @param $page_num
     */
    public function getAvatarList($page_num)
    {
        if ($page_num == 459) {
            die(json_encode(["re_page" => true]));
        }

        $avatarList = [];
        foreach ($this->_html_resources->find("a.avatar") as $element) {
            $avatarList[] = $element->children(0)->src;
        }
        $newAvatarList = [];
        foreach ($avatarList as $key => $value) {
            $imageInfo = $this->getImagesInfo($value);
            if ($imageInfo["width"] == 110 || $imageInfo["height"] == 110) {
                $newAvatarList[] = $value;
            }
        }

        echo json_encode($newAvatarList);
    }

    /**
     * 保存到本地
     *
     * @version             v1.0
     * @author              JianJia.Zhou<jianjia.zhou@longmaster.com.cn>
     * @changeTime          2018/2/25 10:05
     * @param $page_num
     */
    public function uploadAvatar($page_num)
    {
        $url = "http://tieba.baidu.com/bawu2/platform/listMemberInfo?word=php&pn=@pn";
        $url = str_replace("@pn", $page_num, $url);
        $this->_html_resources = file_get_html($url);

        $avatarList = [];
        foreach ($this->_html_resources->find("a.avatar") as $element) {
            $avatarList[] = $element->children(0)->src;
        }
        foreach ($avatarList as $key => $value) {
            $imageInfo = $this->getImagesInfo($value);
            if ($imageInfo["width"] == 110 || $imageInfo["height"] == 110) {
                $upload = new UploadAvatar($value);
                $upload->upload();
                echo $value.PHP_EOL;
            }
        }
    }

    /**
     * 获取图片信息
     *
     * @version             v1.0
     * @author              JianJia.Zhou<jianjia.zhou@longmaster.com.cn>
     * @changeTime          dt
     * @param $images
     * @return array|bool
     */
    private function getImagesInfo($images)
    {
        $imgInfo = getimagesize($images);

        //获取文件大小
        $imgInfo = [
            "width" => $imgInfo[0], //图像宽
            "height" => $imgInfo[1], //图像高
        ];
        return $imgInfo;
    }
}

$page_num = isset($_POST["page"]) && !empty($_POST["page"]) ? $_POST["page"] : 1;
$run = new BaiDuTieBaUserAvatarResources($page_num);
// 作为API 调用
$run->getAvatarList($page_num);
// 作为采集头像 php index.php 采集的头像默认保存到avatar
/*for ($i=1; $i < 459; $i++){
    $run->uploadAvatar($i);
}*/



