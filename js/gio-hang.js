

var keyLocalStorageGiohang = 'danhSachItemGioHang';

/* mô tả: tạo nhanh đối tượng item giỏ hàng
    input: id sản phẩm và số lượng sản phẩm
    output: đối tương item giỏ hàng
*/


function taoDoiTuongItemGioHang(idSanPham, soLuong, anh) {
    var itemGioHang = new Object();
    itemGioHang.idSanPham = idSanPham;
    itemGioHang.soLuong = soLuong;
    itemGioHang.anh = anh;
    

    return itemGioHang;
}

/* mô tả: lấy thông tin giỏ hàng từ loacal storage
    input: 
    output: giỏ hàng item giỏ hàng
*/
function layGioHangTuLocalStorage() {
    danhSachItemGioHang = new Array();
    /* lấy chuổi  json của danh sách item lên */
    var jsonDanhSachItemGioHang = localStorage.getItem(keyLocalStorageGiohang);

    /* chuyển json thành danh sách item giỏ hàng */
    if(jsonDanhSachItemGioHang != null)
        danhSachItemGioHang = JSON.parse(jsonDanhSachItemGioHang);
       
    return danhSachItemGioHang;

}


function luuGioHangXuongLocalStorage(danhSachItemGioHang) {
    /* b1 chuyển đối tượng thành json */
    var jsonDanhSachItemGioHang = JSON.stringify(danhSachItemGioHang);

    /* b2 lưu json xuống local storage */
    localStorage.setItem(keyLocalStorageGiohang, jsonDanhSachItemGioHang);
}


taoDoiTuongItemGioHang.remove = function (idSanPham) {
    var item = layGioHangTuLocalStorage();
    var danhSachItemGioHang = new Array();

    for(var i =0; i < item.length; i++) {
        var cart = item[i]

        if (cart.idSanPham != idSanPham) {
            danhSachItemGioHang.push(cart)
        }
    }
    luuGioHangXuongLocalStorage(danhSachItemGioHang);
        return danhSachItemGioHang;
      
 }

 function xoaGioHang(idSanPham) {
    //alert('xóa khỏi giỏ hàng thành công!');
    taoDoiTuongItemGioHang.remove(idSanPham);
    hienThiGioHang();
    var nodeThongBao = document.getElementById('thongBao');
    MessageService().show(nodeThongBao, 'Xóa khỏi giỏ hàng thành công');
    
}


function chuyenDoiDoiTuongItemGioHang(itemGioHang) {


    var sanPham = laySanPhamTheoId(itemGioHang.idSanPham);
    var tongTien = itemGioHang.soLuong * sanPham.tinhGiaSauKhiGiam();

    var HTML = '   <div class="itemGioHang">  ' +
        '               <div class="hinhAnh">  ' +
        '                   <img src="' + sanPham.hinhAnh + '">  ' +
        '               </div>  ' +
        '               <p class="ten">' + sanPham.ten + '</p>  ' +
        '               <div class="gia">  ' +
        '                   <span class="giaGoc">' + sanPham.giaTruocKhiGiam + ' đ</span>  ' +
        '                   <span class="giaBan">' + sanPham.tinhGiaSauKhiGiam() + 'đ</span>  ' +
        '               </div>  ' +
        '               <input type="number" class="soLuong" value="' + itemGioHang.soLuong + '">  ' +
        '               <p class="tongTien">' + tongTien + 'đ</p>  ' +
        '               <div class="hanhDong">  ' +
        '                   <i onclick="xoaGioHang(' + sanPham.id + ')" class="fas fa-trash"></i>  ' +
        '               </div>  ' +
        '          </div>  ';

    return HTML;

}


function MessageService() {
    var messageService = new Object();
    messageService.show = function (node = document.getElementById(), message) {
        node.style.display = 'block';
        node.innerHTML = message;
        setTimeout(() => {
            node.style.display = 'none';
        }, 2000);
    }
    return messageService;
}
