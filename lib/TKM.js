require("./bridge.min");
/**
 *
 * JavaScript
 * @author Semih Onay <semih.onay@bilgiedu.net>
 *
 * In this module, I converted the Decryption library in C# to JavaScript with aid of Bridge.NET
 * This module, deecrypts İstanbul Büyükşehir Belediyesi Trafik Kontrol Merkezi (TKM) application data
 *
 * I don't own the original C# library. Check the link below.
 * @link https://github.com/eoner/libTKM
 */
Bridge.assembly("Demo", function ($asm, globals) {
    "use strict";

    /**
     * C# Adapter for converting class into JavaScript classes
     */
    Bridge.define("TKMDecrypt", {
        statics: {
            fields: {
                refTable1: null,
                refTable2: null,
                KEY_SIZE: 0,
                CLEAR_TEXT_LENGTH_SECTION_LENGTH: 0,
                KEY_SECTION_LENGTH: 0,
                INT_TO_CHAR_TABLE: null,
                HexChars: null
            },
            ctors: {
                init: function () {
                    this.refTable1 = System.Array.init([237, 220, 239, 100, 120, 248, 241, 54, 244, 169, 178, 230, 68, 203, 43, 127, 175, 114, 154, 60, 218, 20, 140, 238, 84, 95, 93, 142, 62, 3, 69, 255, 156, 152, 211, 148, 112, 245, 246, 113, 161, 99, 123, 59, 94, 21, 209, 19, 205, 122, 2, 91, 72, 184, 240, 82, 131, 213, 201, 90, 31, 181, 227, 221, 222, 162, 104, 200, 217, 133, 149, 190, 81, 85, 53, 6, 197, 103, 44, 102, 79, 96, 186, 219, 27, 229, 139, 76, 145, 89, 83, 247, 34, 193, 58, 61, 48, 174, 35, 250, 46, 182, 143, 232, 71, 136, 18, 50, 78, 128, 39, 108, 109, 75, 42, 126, 233, 51, 115, 74, 47, 101, 49, 32, 16, 172, 88, 151, 111, 45, 116, 55, 188, 118, 234, 22, 77, 228, 67, 36, 198, 15, 226, 242, 28, 153, 121, 33, 12, 163, 129, 107, 135, 98, 70, 150, 63, 144, 124, 158, 11, 171, 86, 159, 66, 231, 141, 64, 56, 160, 7, 8, 155, 206, 5, 23, 1, 37, 9, 40, 110, 29, 132, 195, 216, 105, 10, 225, 125, 24, 176, 65, 130, 253, 235, 192, 87, 189, 41, 14, 249, 30, 166, 243, 164, 80, 194, 183, 167, 173, 26, 180, 202, 73, 191, 97, 57, 210, 146, 236, 207, 147, 177, 215, 223, 170, 25, 214, 38, 252, 137, 254, 52, 208, 196, 0, 4, 13, 138, 212, 117, 165, 179, 106, 119, 224, 134, 168, 199, 204, 17, 157, 251, 187, 185, 92], System.Int32);
                    this.refTable2 = System.Array.init([235, 176, 50, 29, 236, 174, 75, 170, 171, 178, 186, 160, 148, 237, 199, 141, 124, 250, 106, 47, 21, 45, 135, 175, 189, 226, 210, 84, 144, 181, 201, 60, 123, 147, 92, 98, 139, 177, 228, 110, 179, 198, 114, 14, 78, 129, 100, 120, 96, 122, 107, 117, 232, 74, 7, 131, 168, 216, 94, 43, 19, 95, 28, 156, 167, 191, 164, 138, 12, 30, 154, 104, 52, 213, 119, 113, 87, 136, 108, 80, 205, 72, 55, 90, 24, 73, 162, 196, 126, 89, 59, 51, 255, 26, 44, 25, 81, 215, 153, 41, 3, 121, 79, 77, 66, 185, 243, 151, 111, 112, 180, 128, 36, 39, 17, 118, 130, 240, 133, 244, 4, 146, 49, 42, 158, 188, 115, 15, 109, 150, 192, 56, 182, 69, 246, 152, 105, 230, 238, 86, 22, 166, 27, 102, 157, 88, 218, 221, 35, 70, 155, 127, 33, 145, 18, 172, 32, 251, 159, 163, 169, 40, 65, 149, 204, 241, 202, 208, 247, 9, 225, 161, 125, 209, 97, 16, 190, 222, 10, 242, 211, 61, 101, 207, 53, 254, 82, 253, 132, 197, 71, 214, 195, 93, 206, 183, 234, 76, 140, 248, 67, 58, 212, 13, 249, 48, 173, 220, 233, 46, 217, 34, 239, 57, 227, 223, 184, 68, 20, 83, 1, 63, 64, 224, 245, 187, 142, 62, 137, 85, 11, 165, 103, 116, 134, 194, 219, 0, 23, 2, 54, 6, 143, 203, 8, 37, 38, 91, 5, 200, 99, 252, 229, 193, 231, 31], System.Int32);
                    this.KEY_SIZE = 8;
                    this.CLEAR_TEXT_LENGTH_SECTION_LENGTH = 7;
                    this.KEY_SECTION_LENGTH = 30;
                    this.INT_TO_CHAR_TABLE = String.fromCharCode(0) + "ZNÇV bCKıUt01ÜLşEaB23OÖ456u7M8S!9ŞFRDAIPHpTĞiü/J+%hrGYsyc&" + "(zn)çvjd=ekğmog?*-öf_İ{l}[]#$@<>;.:\"'WwQqXx\\\n\r,|~é^" + String.fromCharCode(1) + String.fromCharCode(2) + String.fromCharCode(3) + String.fromCharCode(4) + String.fromCharCode(5) + String.fromCharCode(6) + String.fromCharCode(7) + String.fromCharCode(8) + String.fromCharCode(9) + String.fromCharCode(11) + String.fromCharCode(12) + String.fromCharCode(14) + String.fromCharCode(15) + String.fromCharCode(16) + String.fromCharCode(17) + String.fromCharCode(18) + String.fromCharCode(19) + String.fromCharCode(20);
                    this.HexChars = "0123456789ABCDEF";
                }
            },
            methods: {
                /**
                 * @return {string}
                 */
                Decrypt0: function (cipherText, key) {
                    let _loc7_ = 0;
                    let _loc14_ = 0;
                    let _loc15_ = "";
                    let _loc16_ = 0;
                    let _loc17_ = 0;
                    let _loc18_ = 0;
                    let _loc19_ = 0;
                    let _loc20_ = 0;
                    let _loc21_ = 0;
                    let _loc22_ = 0;
                    let _loc3_ = "";
                    let _loc4_ = "";
                    let _loc5_ = "";
                    let _loc6_ = "";
                    let _loc8_ = (cipherText.charCodeAt((((cipherText.length - 1) | 0))) - 48) | 0;
                    switch (_loc8_) {
                        case 0:
                            _loc6_ = cipherText;
                            break;
                        case 1:
                            _loc6_ = TKMDecrypt.convertFromHexStr(cipherText, -1);
                            break;
                        case 2:
                            _loc14_ = (cipherText.charCodeAt((((cipherText.length - 2) | 0))) - 48) | 0;
                            _loc15_ = TKMDecrypt.deShuffleHexStr(cipherText, key, _loc14_, -2);
                            _loc6_ = TKMDecrypt.convertFromHexStr(_loc15_, 0);
                            break;
                    }
                    let _loc9_ = System.Array.init((TKMDecrypt.KEY_SIZE), 0, System.Int32);
                    _loc7_ = 0;
                    while (_loc7_ < TKMDecrypt.KEY_SIZE) {
                        _loc16_ = (_loc6_.charCodeAt((((20 + _loc7_) | 0))) - 90) | 0;
                        _loc17_ = ((_loc6_.charCodeAt(((((25 + TKMDecrypt.KEY_SIZE) | 0) + _loc16_) | 0)) - 90) | 0);
                        _loc9_[System.Array.index(_loc7_, _loc9_)] = _loc17_;
                        _loc7_ = (_loc7_ + 1) | 0;
                    }
                    let _loc10_ = 0;
                    _loc7_ = 0;
                    while (_loc7_ < TKMDecrypt.KEY_SIZE) {
                        _loc10_ = (_loc10_ + _loc9_[System.Array.index(_loc7_, _loc9_)]) | 0;
                        _loc7_ = (_loc7_ + 1) | 0;
                    }
                    _loc10_ = _loc10_ % _loc9_[System.Array.index(0, _loc9_)];
                    _loc10_ = (_loc10_ + 1) | 0;
                    let _loc11_ = 0;
                    _loc7_ = 0;
                    while (_loc7_ < 5) {
                        _loc18_ = (_loc6_.charCodeAt((((((20 + TKMDecrypt.KEY_SIZE) | 0) + _loc7_) | 0))) - (((60 + _loc7_) | 0))) | 0;
                        _loc5_ = (_loc5_ || "") + String.fromCharCode(((_loc18_) & 65535));
                        _loc7_ = (_loc7_ + 1) | 0;
                    }
                    _loc11_ = Number(_loc5_);
                    _loc4_ = _loc6_.substr(((55 + TKMDecrypt.KEY_SIZE) | 0), _loc11_);
                    let _loc12_ = _loc11_;
                    let _loc13_ = 0;
                    _loc7_ = 0;
                    while (_loc7_ < _loc12_) {
                        _loc19_ = _loc4_.charCodeAt((_loc7_));
                        _loc20_ = _loc9_[System.Array.index(_loc13_ % TKMDecrypt.KEY_SIZE, _loc9_)];
                        _loc21_ = _loc19_ << ((8 - _loc20_) | 0) & 255;
                        _loc19_ = (_loc19_ >> _loc20_ | _loc21_) & 255;
                        _loc22_ = _loc19_;
                        _loc22_ = (_loc22_ - (_loc10_)) | 0;
                        _loc3_ = (_loc3_ || "") + String.fromCharCode(TKMDecrypt.INT_TO_CHAR_TABLE.charCodeAt((_loc22_)));
                        _loc13_ = (_loc13_ + 1) | 0;
                        _loc7_ = (_loc7_ + 1) | 0;
                    }
                    return _loc3_;
                },
                /**
                 * TKMDecryptV12
                 *
                 * @static
                 * @public
                 * @this TKMDecrypt
                 * @memberof TKMDecrypt
                 * @param   {string}    cipherText
                 * @param   {string}    key
                 * @return  {string}
                 */
                Decrypt1: function (cipherText, key) {
                    let _loc7_ = 0;
                    let _loc14_ = 0;
                    let _loc15_ = "";
                    let _loc16_ = 0;
                    let _loc17_ = 0;
                    let _loc18_ = 0;
                    let _loc19_ = 0;
                    let _loc20_ = 0;
                    let _loc21_ = 0;
                    let _loc22_ = 0;
                    let _loc3_ = "";
                    let _loc4_ = "";
                    let _loc5_ = "";
                    let _loc6_ = "";
                    let _loc8_ = (cipherText.charCodeAt((((cipherText.length - 1) | 0))) - 48) | 0;
                    switch (_loc8_) {
                        case 0:
                            _loc6_ = cipherText;
                            break;
                        case 1:
                            _loc6_ = TKMDecrypt.convertFromHexStr(cipherText, -1);
                            break;
                        case 2:
                            _loc14_ = (cipherText.charCodeAt((((cipherText.length - 2) | 0))) - 48) | 0;
                            _loc15_ = TKMDecrypt.deShuffleHexStr(cipherText, key, _loc14_, -2);
                            _loc6_ = TKMDecrypt.convertFromHexStr(_loc15_, 0);
                            break;
                    }
                    let _loc9_ = System.Array.init((TKMDecrypt.KEY_SIZE), 0, System.Int32);
                    _loc7_ = 0;
                    while (_loc7_ < TKMDecrypt.KEY_SIZE) {
                        _loc16_ = (_loc6_.charCodeAt((((20 + _loc7_) | 0))) - 90) | 0;
                        _loc17_ = ((_loc6_.charCodeAt(((((((20 + TKMDecrypt.CLEAR_TEXT_LENGTH_SECTION_LENGTH) | 0) + TKMDecrypt.KEY_SIZE) | 0) + _loc16_) | 0)) - 90) | 0);
                        _loc9_[System.Array.index(_loc7_, _loc9_)] = _loc17_;
                        _loc7_ = (_loc7_ + 1) | 0;
                    }
                    let _loc10_ = 0;
                    _loc7_ = 0;
                    while (_loc7_ < TKMDecrypt.KEY_SIZE) {
                        _loc10_ = (_loc10_ + _loc9_[System.Array.index(_loc7_, _loc9_)]) | 0;
                        _loc7_ = (_loc7_ + 1) | 0;
                    }
                    _loc10_ = _loc10_ % _loc9_[System.Array.index(0, _loc9_)];
                    _loc10_ = (_loc10_ + 1) | 0;
                    let _loc11_ = 0;
                    _loc7_ = 0;
                    while (_loc7_ < TKMDecrypt.CLEAR_TEXT_LENGTH_SECTION_LENGTH) {
                        _loc18_ = (_loc6_.charCodeAt((((((20 + TKMDecrypt.KEY_SIZE) | 0) + _loc7_) | 0))) - (((60 + _loc7_) | 0))) | 0;
                        _loc5_ = (_loc5_ || "") + String.fromCharCode(((_loc18_) & 65535));
                        _loc7_ = (_loc7_ + 1) | 0;
                    }
                    _loc11_ = System.Convert.toInt32(_loc5_);
                    _loc4_ = _loc6_.substr(((((((20 + TKMDecrypt.KEY_SECTION_LENGTH) | 0) + TKMDecrypt.CLEAR_TEXT_LENGTH_SECTION_LENGTH) | 0) + TKMDecrypt.KEY_SIZE) | 0));
                    let _loc12_ = _loc11_;
                    let _loc13_ = 0;
                    _loc7_ = 0;
                    while (_loc7_ < _loc12_) {
                        _loc19_ = _loc4_.charCodeAt((_loc7_));
                        _loc20_ = _loc9_[System.Array.index(_loc13_ % TKMDecrypt.KEY_SIZE, _loc9_)];
                        _loc21_ = _loc19_ << ((8 - _loc20_) | 0) & 255;
                        _loc19_ = (_loc19_ >> _loc20_ | _loc21_) & 255;
                        _loc22_ = _loc19_;
                        _loc22_ = (_loc22_ - (_loc10_)) | 0;
                        _loc3_ = (_loc3_ || "") + String.fromCharCode(TKMDecrypt.INT_TO_CHAR_TABLE.charCodeAt((_loc22_)));
                        _loc13_ = (_loc13_ + 1) | 0;
                        _loc7_ = (_loc7_ + 1) | 0;
                    }
                    return _loc3_;
                },
                /**
                 * @return {string}
                 */
                Decrypt2: function (cipherText) {
                    let inBytes = System.Text.Encoding.UTF8.GetBytes$2(cipherText);
                    let outBytes = System.Array.init(inBytes.length, 0, System.Byte);

                    let key = 3;
                    let c1 = 6;
                    let c2 = 3; //loc6
                    while (c1 < inBytes.length) {
                        let i1 = (((inBytes[System.Array.index(Bridge.identity(c1, (c1 = (c1 + 1) | 0)), inBytes)] - 48) | 0));
                        let i2 = (((inBytes[System.Array.index(Bridge.identity(c1, (c1 = (c1 + 1) | 0)), inBytes)] - 48) | 0));

                        if (i1 > 9) {
                            i1 = (i1 - 7) | 0;
                        }
                        if (i2 > 9) {
                            i2 = (i2 - 7) | 0;
                        }

                        i1 = ((i1 << 4) + i2) | 0;
                        i1 = i1 ^ TKMDecrypt.refTable1[System.Array.index(((key + (c2 & 15)) | 0), TKMDecrypt.refTable1)];
                        i1 = TKMDecrypt.refTable2[System.Array.index(i1, TKMDecrypt.refTable2)];
                        outBytes[System.Array.index(((c2 - 3) | 0), outBytes)] = i1 & 255;
                        c2 = (c2 + 1) | 0;
                    }

                    let clearText = System.Text.Encoding.UTF8.GetString(outBytes);
                    return clearText.substr(0, System.String.indexOf(clearText, String.fromCharCode(0)));
                },
                convertFromHexStr: function (param1, param2) {
                    let _loc6_ = 0;
                    let _loc3_ = (param1.length + param2) | 0;
                    let _loc4_ = "";
                    let _loc5_ = 0;
                    while (_loc5_ < _loc3_) {
                        _loc6_ = System.String.indexOf(TKMDecrypt.HexChars, String.fromCharCode(param1.charCodeAt(_loc5_))) << 4 | System.String.indexOf(TKMDecrypt.HexChars, String.fromCharCode(param1.charCodeAt(((_loc5_ + 1) | 0))));
                        _loc4_ = (_loc4_ || "") + String.fromCharCode(((_loc6_) & 65535));
                        _loc5_ = (_loc5_ + 2) | 0;
                    }
                    return _loc4_;
                },
                deShuffleHexStr: function (param1, param2, param3, param4) {
                    let _loc5_ = 0;
                    let _loc6_ = 0;
                    let _loc12_ = 0;
                    let _loc13_ = 0;
                    let _loc14_ = 0;
                    let _loc7_ = System.Array.init((TKMDecrypt.KEY_SIZE), 0, System.Int32);
                    let _loc8_ = new (System.Collections.Generic.List$1(System.Int32)).ctor();
                    _loc5_ = 0;
                    while (_loc5_ < TKMDecrypt.KEY_SIZE) {
                        _loc7_[System.Array.index((((_loc5_ + param3) | 0)) % TKMDecrypt.KEY_SIZE, _loc7_)] = (param2.charCodeAt((_loc5_)) - 48) | 0;
                        _loc5_ = (_loc5_ + 1) | 0;
                    }
                    let _loc9_ = (param1.length + param4) | 0;
                    let _loc10_ = param1.substr(0, _loc9_);
                    let _loc11_ = (Bridge.Int.div(_loc9_, TKMDecrypt.KEY_SIZE)) | 0;
                    let _loc15_ = 0;
                    while (_loc15_ < _loc10_.length) {
                        _loc8_.add(_loc10_.charCodeAt(_loc15_));
                        _loc15_ = (_loc15_ + 1) | 0;
                    }
                    _loc5_ = 0;
                    while (_loc5_ < _loc11_) {
                        _loc12_ = Bridge.Int.mul(_loc5_, TKMDecrypt.KEY_SIZE);
                        _loc6_ = 0;
                        while (_loc6_ < TKMDecrypt.KEY_SIZE) {
                            _loc13_ = (_loc12_ + _loc7_[System.Array.index(_loc6_, _loc7_)]) | 0;
                            _loc14_ = param1.charCodeAt((((_loc12_ + _loc6_) | 0)));
                            //  _loc8_.splice(_loc13_,1,_loc14_);
                            _loc8_.setItem(_loc13_, _loc14_);
                            _loc6_ = (_loc6_ + 1) | 0;
                        }
                        _loc5_ = (_loc5_ + 1) | 0;
                    }
                    _loc10_ = "";
                    _loc5_ = 0;
                    while (_loc5_ < _loc8_.Count) {
                        _loc10_ = (_loc10_ || "") + String.fromCharCode((((_loc8_.getItem(_loc5_))) & 65535));
                        _loc5_ = (_loc5_ + 1) | 0;
                    }
                    return _loc10_;
                }
            }
        }
    });
});
