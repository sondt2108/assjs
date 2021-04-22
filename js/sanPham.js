function taoDoiTuongSanPham(hinhAnh, ten, giaTruocKhiGiam, phanTramGiamGia, khuVuc, id) {
    var sanPham = new Object();
    sanPham.hinhAnh = hinhAnh;
    sanPham.ten = ten;
    sanPham.giaTruocKhiGiam = giaTruocKhiGiam;
    sanPham.phanTramGiamGia = phanTramGiamGia;
    sanPham.khuVuc = khuVuc;
    sanPham.id =  taoId();

    if(id != null)
        sanPham.id = id;
    else
        sanPham.id = taoId();

    sanPham.tinhGiaSauKhiGiam = function () {
        var giaSauKhiGiam = this.giaTruocKhiGiam * (100 - this.phanTramGiamGia) / 100;
        return giaSauKhiGiam;
    }
    

    sanPham.toJson = function() {
        var json = JSON.stringify(this);
        return json;
    }
    sanPham.fromJSON = function(json) {
        var doiTuongDayDu = new Object();

        var doiTuong = JSON.parse(json);

        var doiTuongDayDu = taoDoiTuongSanPham(doiTuong.hinhAnh, doiTuong.ten, doiTuong.giaTruocKhiGiam, doiTuong.giamGia, doiTuong.khuVuc, doiTuong.id);
        return doiTuongDayDu;
    }
    return sanPham;

}

function laySanPhamTheoId(idSanPham) {
    var sanPham1 = new Object();
    var danhSachSanPham = laySanPhamDuoiLocalStorage();

    for(var i = 0; i < danhSachSanPham.length; i++) {
        var sanPhamHienTai = danhSachSanPham[i];
        if (sanPhamHienTai.id == idSanPham) {
            sanPham1 = sanPhamHienTai;
        }
    }

    sanPham1 = taoDoiTuongSanPham(sanPham1.hinhAnh, sanPham1.ten, sanPham1.giaTruocKhiGiam, sanPham1.phanTramGiamGia, sanPham1.khuVuc, sanPham1.id);

    return sanPham1;
}

function laySanPhamDuoiLocalStorage() {
    var jsonDanhSachSanPham = localStorage.getItem('danhSachSanPham');

    var danhSachSanPham = JSON.parse(jsonDanhSachSanPham);

    return danhSachSanPham;
}