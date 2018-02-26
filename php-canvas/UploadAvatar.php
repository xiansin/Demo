<?php
/**
 * Created by PhpStorm
 * FileName: UploadAvatar.php
 * User: JianJia.Zhou<jianjia.zhou@longmaster.com.cn>
 * DateTime: 2018/2/25 9:58
 */
class UploadAvatar{
    private $_stream;
    /**
     * @var string
     */
    private $_path = "./avatar/";

    /**
     * UploadAvatar constructor.
     * @param string $url
     * @throws Exception
     */
    public function __construct($url = "")
    {
        if(empty($url)){
            throw new Exception('url 不能为空');
        }
        $this->_stream = file_get_contents($url);
    }

    /**
     * @version             v1.0
     * @author              JianJia.Zhou<jianjia.zhou@longmaster.com.cn>
     * @changeTime          2018/2/25 10:02
     */
    public function upload()
    {
        $filename = $this->randFileName("test.jpg");
        file_put_contents($this->_path.$filename,$this->_stream);
    }

    /**
     * @version             v1.0
     * @author              JianJia.Zhou<jianjia.zhou@longmaster.com.cn>
     * @changeTime          2018/2/25 10:02
     * @param $fileName
     * @return string
     */
    private function randFileName($fileName)
    {
        list($name, $type) = explode(".", $fileName);
        $newFile = md5(uniqid());
        return $newFile . '.' . $type;
    }
}