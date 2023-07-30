var DropImages = (function () {
  'use strict';

  /*!
   * Compressor.js v1.2.1
   * https://fengyuanchen.github.io/compressorjs
   *
   * Copyright 2018-present Chen Fengyuan
   * Released under the MIT license
   *
   * Date: 2023-02-28T14:09:41.732Z
   */

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var canvasToBlob = {exports: {}};

  /*
   * JavaScript Canvas to Blob
   * https://github.com/blueimp/JavaScript-Canvas-to-Blob
   *
   * Copyright 2012, Sebastian Tschan
   * https://blueimp.net
   *
   * Licensed under the MIT license:
   * https://opensource.org/licenses/MIT
   *
   * Based on stackoverflow user Stoive's code snippet:
   * http://stackoverflow.com/q/4998908
   */
  (function (module) {
    if (typeof window === 'undefined') {
      return;
    }
    (function (window) {

      var CanvasPrototype = window.HTMLCanvasElement && window.HTMLCanvasElement.prototype;
      var hasBlobConstructor = window.Blob && function () {
        try {
          return Boolean(new Blob());
        } catch (e) {
          return false;
        }
      }();
      var hasArrayBufferViewSupport = hasBlobConstructor && window.Uint8Array && function () {
        try {
          return new Blob([new Uint8Array(100)]).size === 100;
        } catch (e) {
          return false;
        }
      }();
      var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
      var dataURIPattern = /^data:((.*?)(;charset=.*?)?)(;base64)?,/;
      var dataURLtoBlob = (hasBlobConstructor || BlobBuilder) && window.atob && window.ArrayBuffer && window.Uint8Array && function (dataURI) {
        var matches, mediaType, isBase64, dataString, byteString, arrayBuffer, intArray, i, bb;
        // Parse the dataURI components as per RFC 2397
        matches = dataURI.match(dataURIPattern);
        if (!matches) {
          throw new Error('invalid data URI');
        }
        // Default to text/plain;charset=US-ASCII
        mediaType = matches[2] ? matches[1] : 'text/plain' + (matches[3] || ';charset=US-ASCII');
        isBase64 = !!matches[4];
        dataString = dataURI.slice(matches[0].length);
        if (isBase64) {
          // Convert base64 to raw binary data held in a string:
          byteString = atob(dataString);
        } else {
          // Convert base64/URLEncoded data component to raw binary:
          byteString = decodeURIComponent(dataString);
        }
        // Write the bytes of the string to an ArrayBuffer:
        arrayBuffer = new ArrayBuffer(byteString.length);
        intArray = new Uint8Array(arrayBuffer);
        for (i = 0; i < byteString.length; i += 1) {
          intArray[i] = byteString.charCodeAt(i);
        }
        // Write the ArrayBuffer (or ArrayBufferView) to a blob:
        if (hasBlobConstructor) {
          return new Blob([hasArrayBufferViewSupport ? intArray : arrayBuffer], {
            type: mediaType
          });
        }
        bb = new BlobBuilder();
        bb.append(arrayBuffer);
        return bb.getBlob(mediaType);
      };
      if (window.HTMLCanvasElement && !CanvasPrototype.toBlob) {
        if (CanvasPrototype.mozGetAsFile) {
          CanvasPrototype.toBlob = function (callback, type, quality) {
            var self = this;
            setTimeout(function () {
              if (quality && CanvasPrototype.toDataURL && dataURLtoBlob) {
                callback(dataURLtoBlob(self.toDataURL(type, quality)));
              } else {
                callback(self.mozGetAsFile('blob', type));
              }
            });
          };
        } else if (CanvasPrototype.toDataURL && dataURLtoBlob) {
          if (CanvasPrototype.msToBlob) {
            CanvasPrototype.toBlob = function (callback, type, quality) {
              var self = this;
              setTimeout(function () {
                if ((type && type !== 'image/png' || quality) && CanvasPrototype.toDataURL && dataURLtoBlob) {
                  callback(dataURLtoBlob(self.toDataURL(type, quality)));
                } else {
                  callback(self.msToBlob(type));
                }
              });
            };
          } else {
            CanvasPrototype.toBlob = function (callback, type, quality) {
              var self = this;
              setTimeout(function () {
                callback(dataURLtoBlob(self.toDataURL(type, quality)));
              });
            };
          }
        }
      }
      if (module.exports) {
        module.exports = dataURLtoBlob;
      } else {
        window.dataURLtoBlob = dataURLtoBlob;
      }
    })(window);
  })(canvasToBlob);
  var toBlob = canvasToBlob.exports;

  var isBlob = function isBlob(value) {
    if (typeof Blob === 'undefined') {
      return false;
    }
    return value instanceof Blob || Object.prototype.toString.call(value) === '[object Blob]';
  };

  var DEFAULTS = {
    /**
     * Indicates if output the original image instead of the compressed one
     * when the size of the compressed image is greater than the original one's
     * @type {boolean}
     */
    strict: true,
    /**
     * Indicates if read the image's Exif Orientation information,
     * and then rotate or flip the image automatically.
     * @type {boolean}
     */
    checkOrientation: true,
    /**
     * Indicates if retain the image's Exif information after compressed.
     * @type {boolean}
    */
    retainExif: false,
    /**
     * The max width of the output image.
     * @type {number}
     */
    maxWidth: Infinity,
    /**
     * The max height of the output image.
     * @type {number}
     */
    maxHeight: Infinity,
    /**
     * The min width of the output image.
     * @type {number}
     */
    minWidth: 0,
    /**
     * The min height of the output image.
     * @type {number}
     */
    minHeight: 0,
    /**
     * The width of the output image.
     * If not specified, the natural width of the source image will be used.
     * @type {number}
     */
    width: undefined,
    /**
     * The height of the output image.
     * If not specified, the natural height of the source image will be used.
     * @type {number}
     */
    height: undefined,
    /**
     * Sets how the size of the image should be resized to the container
     * specified by the `width` and `height` options.
     * @type {string}
     */
    resize: 'none',
    /**
     * The quality of the output image.
     * It must be a number between `0` and `1`,
     * and only available for `image/jpeg` and `image/webp` images.
     * Check out {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob canvas.toBlob}.
     * @type {number}
     */
    quality: 0.8,
    /**
     * The mime type of the output image.
     * By default, the original mime type of the source image file will be used.
     * @type {string}
     */
    mimeType: 'auto',
    /**
     * Files whose file type is included in this list,
     * and whose file size exceeds the `convertSize` value will be converted to JPEGs.
     * @type {string｜Array}
     */
    convertTypes: ['image/png'],
    /**
     * PNG files over this size (5 MB by default) will be converted to JPEGs.
     * To disable this, just set the value to `Infinity`.
     * @type {number}
     */
    convertSize: 5000000,
    /**
     * The hook function to execute before draw the image into the canvas for compression.
     * @type {Function}
     * @param {CanvasRenderingContext2D} context - The 2d rendering context of the canvas.
     * @param {HTMLCanvasElement} canvas - The canvas for compression.
     * @example
     * function (context, canvas) {
     *   context.fillStyle = '#fff';
     * }
     */
    beforeDraw: null,
    /**
     * The hook function to execute after drew the image into the canvas for compression.
     * @type {Function}
     * @param {CanvasRenderingContext2D} context - The 2d rendering context of the canvas.
     * @param {HTMLCanvasElement} canvas - The canvas for compression.
     * @example
     * function (context, canvas) {
     *   context.filter = 'grayscale(100%)';
     * }
     */
    drew: null,
    /**
     * The hook function to execute when success to compress the image.
     * @type {Function}
     * @param {File} file - The compressed image File object.
     * @example
     * function (file) {
     *   console.log(file);
     * }
     */
    success: null,
    /**
     * The hook function to execute when fail to compress the image.
     * @type {Function}
     * @param {Error} err - An Error object.
     * @example
     * function (err) {
     *   console.log(err.message);
     * }
     */
    error: null
  };

  var IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
  var WINDOW = IS_BROWSER ? window : {};

  /**
   * Check if the given value is a positive number.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a positive number, else `false`.
   */
  var isPositiveNumber = function isPositiveNumber(value) {
    return value > 0 && value < Infinity;
  };
  var slice = Array.prototype.slice;

  /**
   * Convert array-like or iterable object to an array.
   * @param {*} value - The value to convert.
   * @returns {Array} Returns a new array.
   */
  function toArray(value) {
    return Array.from ? Array.from(value) : slice.call(value);
  }
  var REGEXP_IMAGE_TYPE = /^image\/.+$/;

  /**
   * Check if the given value is a mime type of image.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given is a mime type of image, else `false`.
   */
  function isImageType(value) {
    return REGEXP_IMAGE_TYPE.test(value);
  }

  /**
   * Convert image type to extension.
   * @param {string} value - The image type to convert.
   * @returns {boolean} Returns the image extension.
   */
  function imageTypeToExtension(value) {
    var extension = isImageType(value) ? value.substr(6) : '';
    if (extension === 'jpeg') {
      extension = 'jpg';
    }
    return ".".concat(extension);
  }
  var fromCharCode = String.fromCharCode;

  /**
   * Get string from char code in data view.
   * @param {DataView} dataView - The data view for read.
   * @param {number} start - The start index.
   * @param {number} length - The read length.
   * @returns {string} The read result.
   */
  function getStringFromCharCode(dataView, start, length) {
    var str = '';
    var i;
    length += start;
    for (i = start; i < length; i += 1) {
      str += fromCharCode(dataView.getUint8(i));
    }
    return str;
  }
  var btoa = WINDOW.btoa;

  /**
   * Transform array buffer to Data URL.
   * @param {ArrayBuffer} arrayBuffer - The array buffer to transform.
   * @param {string} mimeType - The mime type of the Data URL.
   * @returns {string} The result Data URL.
   */
  function arrayBufferToDataURL(arrayBuffer, mimeType) {
    var chunks = [];
    var chunkSize = 8192;
    var uint8 = new Uint8Array(arrayBuffer);
    while (uint8.length > 0) {
      // XXX: Babel's `toConsumableArray` helper will throw error in IE or Safari 9
      // eslint-disable-next-line prefer-spread
      chunks.push(fromCharCode.apply(null, toArray(uint8.subarray(0, chunkSize))));
      uint8 = uint8.subarray(chunkSize);
    }
    return "data:".concat(mimeType, ";base64,").concat(btoa(chunks.join('')));
  }

  /**
   * Get orientation value from given array buffer.
   * @param {ArrayBuffer} arrayBuffer - The array buffer to read.
   * @returns {number} The read orientation value.
   */
  function resetAndGetOrientation(arrayBuffer) {
    var dataView = new DataView(arrayBuffer);
    var orientation;

    // Ignores range error when the image does not have correct Exif information
    try {
      var littleEndian;
      var app1Start;
      var ifdStart;

      // Only handle JPEG image (start by 0xFFD8)
      if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
        var length = dataView.byteLength;
        var offset = 2;
        while (offset + 1 < length) {
          if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
            app1Start = offset;
            break;
          }
          offset += 1;
        }
      }
      if (app1Start) {
        var exifIDCode = app1Start + 4;
        var tiffOffset = app1Start + 10;
        if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
          var endianness = dataView.getUint16(tiffOffset);
          littleEndian = endianness === 0x4949;
          if (littleEndian || endianness === 0x4D4D /* bigEndian */) {
            if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
              var firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);
              if (firstIFDOffset >= 0x00000008) {
                ifdStart = tiffOffset + firstIFDOffset;
              }
            }
          }
        }
      }
      if (ifdStart) {
        var _length = dataView.getUint16(ifdStart, littleEndian);
        var _offset;
        var i;
        for (i = 0; i < _length; i += 1) {
          _offset = ifdStart + i * 12 + 2;
          if (dataView.getUint16(_offset, littleEndian) === 0x0112 /* Orientation */) {
            // 8 is the offset of the current tag's value
            _offset += 8;

            // Get the original orientation value
            orientation = dataView.getUint16(_offset, littleEndian);

            // Override the orientation with its default value
            dataView.setUint16(_offset, 1, littleEndian);
            break;
          }
        }
      }
    } catch (e) {
      orientation = 1;
    }
    return orientation;
  }

  /**
   * Parse Exif Orientation value.
   * @param {number} orientation - The orientation to parse.
   * @returns {Object} The parsed result.
   */
  function parseOrientation(orientation) {
    var rotate = 0;
    var scaleX = 1;
    var scaleY = 1;
    switch (orientation) {
      // Flip horizontal
      case 2:
        scaleX = -1;
        break;

      // Rotate left 180°
      case 3:
        rotate = -180;
        break;

      // Flip vertical
      case 4:
        scaleY = -1;
        break;

      // Flip vertical and rotate right 90°
      case 5:
        rotate = 90;
        scaleY = -1;
        break;

      // Rotate right 90°
      case 6:
        rotate = 90;
        break;

      // Flip horizontal and rotate right 90°
      case 7:
        rotate = 90;
        scaleX = -1;
        break;

      // Rotate left 90°
      case 8:
        rotate = -90;
        break;
    }
    return {
      rotate: rotate,
      scaleX: scaleX,
      scaleY: scaleY
    };
  }
  var REGEXP_DECIMALS = /\.\d*(?:0|9){12}\d*$/;

  /**
   * Normalize decimal number.
   * Check out {@link https://0.30000000000000004.com/}
   * @param {number} value - The value to normalize.
   * @param {number} [times=100000000000] - The times for normalizing.
   * @returns {number} Returns the normalized number.
   */
  function normalizeDecimalNumber(value) {
    var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100000000000;
    return REGEXP_DECIMALS.test(value) ? Math.round(value * times) / times : value;
  }

  /**
   * Get the max sizes in a rectangle under the given aspect ratio.
   * @param {Object} data - The original sizes.
   * @param {string} [type='contain'] - The adjust type.
   * @returns {Object} The result sizes.
   */
  function getAdjustedSizes(_ref) {
    var aspectRatio = _ref.aspectRatio,
      height = _ref.height,
      width = _ref.width;
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
    var isValidWidth = isPositiveNumber(width);
    var isValidHeight = isPositiveNumber(height);
    if (isValidWidth && isValidHeight) {
      var adjustedWidth = height * aspectRatio;
      if ((type === 'contain' || type === 'none') && adjustedWidth > width || type === 'cover' && adjustedWidth < width) {
        height = width / aspectRatio;
      } else {
        width = height * aspectRatio;
      }
    } else if (isValidWidth) {
      height = width / aspectRatio;
    } else if (isValidHeight) {
      width = height * aspectRatio;
    }
    return {
      width: width,
      height: height
    };
  }

  /**
   * Get Exif information from the given array buffer.
   * @param {ArrayBuffer} arrayBuffer - The array buffer to read.
   * @returns {Array} The read Exif information.
   */
  function getExif(arrayBuffer) {
    var array = toArray(new Uint8Array(arrayBuffer));
    var length = array.length;
    var segments = [];
    var start = 0;
    while (start + 3 < length) {
      var value = array[start];
      var next = array[start + 1];

      // SOS (Start of Scan)
      if (value === 0xFF && next === 0xDA) {
        break;
      }

      // SOI (Start of Image)
      if (value === 0xFF && next === 0xD8) {
        start += 2;
      } else {
        var offset = array[start + 2] * 256 + array[start + 3];
        var end = start + offset + 2;
        var segment = array.slice(start, end);
        segments.push(segment);
        start = end;
      }
    }
    return segments.reduce(function (exifArray, current) {
      if (current[0] === 0xFF && current[1] === 0xE1) {
        return exifArray.concat(current);
      }
      return exifArray;
    }, []);
  }

  /**
   * Insert Exif information into the given array buffer.
   * @param {ArrayBuffer} arrayBuffer - The array buffer to transform.
   * @param {Array} exifArray - The Exif information to insert.
   * @returns {ArrayBuffer} The transformed array buffer.
   */
  function insertExif(arrayBuffer, exifArray) {
    var array = toArray(new Uint8Array(arrayBuffer));
    if (array[2] !== 0xFF || array[3] !== 0xE0) {
      return arrayBuffer;
    }
    var app0Length = array[4] * 256 + array[5];
    var newArrayBuffer = [0xFF, 0xD8].concat(exifArray, array.slice(4 + app0Length));
    return new Uint8Array(newArrayBuffer);
  }

  var ArrayBuffer$1 = WINDOW.ArrayBuffer,
    FileReader$1 = WINDOW.FileReader;
  var URL$1 = WINDOW.URL || WINDOW.webkitURL;
  var REGEXP_EXTENSION = /\.\w+$/;
  var AnotherCompressor = WINDOW.Compressor;

  /**
   * Creates a new image compressor.
   * @class
   */
  var Compressor = /*#__PURE__*/function () {
    /**
     * The constructor of Compressor.
     * @param {File|Blob} file - The target image file for compressing.
     * @param {Object} [options] - The options for compressing.
     */
    function Compressor(file, options) {
      _classCallCheck(this, Compressor);
      this.file = file;
      this.exif = [];
      this.image = new Image();
      this.options = _objectSpread2(_objectSpread2({}, DEFAULTS), options);
      this.aborted = false;
      this.result = null;
      this.init();
    }
    _createClass(Compressor, [{
      key: "init",
      value: function init() {
        var _this = this;
        var file = this.file,
          options = this.options;
        if (!isBlob(file)) {
          this.fail(new Error('The first argument must be a File or Blob object.'));
          return;
        }
        var mimeType = file.type;
        if (!isImageType(mimeType)) {
          this.fail(new Error('The first argument must be an image File or Blob object.'));
          return;
        }
        if (!URL$1 || !FileReader$1) {
          this.fail(new Error('The current browser does not support image compression.'));
          return;
        }
        if (!ArrayBuffer$1) {
          options.checkOrientation = false;
          options.retainExif = false;
        }
        var isJPEGImage = mimeType === 'image/jpeg';
        var checkOrientation = isJPEGImage && options.checkOrientation;
        var retainExif = isJPEGImage && options.retainExif;
        if (URL$1 && !checkOrientation && !retainExif) {
          this.load({
            url: URL$1.createObjectURL(file)
          });
        } else {
          var reader = new FileReader$1();
          this.reader = reader;
          reader.onload = function (_ref) {
            var target = _ref.target;
            var result = target.result;
            var data = {};
            var orientation = 1;
            if (checkOrientation) {
              // Reset the orientation value to its default value 1
              // as some iOS browsers will render image with its orientation
              orientation = resetAndGetOrientation(result);
              if (orientation > 1) {
                _extends(data, parseOrientation(orientation));
              }
            }
            if (retainExif) {
              _this.exif = getExif(result);
            }
            if (checkOrientation || retainExif) {
              if (!URL$1

              // Generate a new URL with the default orientation value 1.
              || orientation > 1) {
                data.url = arrayBufferToDataURL(result, mimeType);
              } else {
                data.url = URL$1.createObjectURL(file);
              }
            } else {
              data.url = result;
            }
            _this.load(data);
          };
          reader.onabort = function () {
            _this.fail(new Error('Aborted to read the image with FileReader.'));
          };
          reader.onerror = function () {
            _this.fail(new Error('Failed to read the image with FileReader.'));
          };
          reader.onloadend = function () {
            _this.reader = null;
          };
          if (checkOrientation || retainExif) {
            reader.readAsArrayBuffer(file);
          } else {
            reader.readAsDataURL(file);
          }
        }
      }
    }, {
      key: "load",
      value: function load(data) {
        var _this2 = this;
        var file = this.file,
          image = this.image;
        image.onload = function () {
          _this2.draw(_objectSpread2(_objectSpread2({}, data), {}, {
            naturalWidth: image.naturalWidth,
            naturalHeight: image.naturalHeight
          }));
        };
        image.onabort = function () {
          _this2.fail(new Error('Aborted to load the image.'));
        };
        image.onerror = function () {
          _this2.fail(new Error('Failed to load the image.'));
        };

        // Match all browsers that use WebKit as the layout engine in iOS devices,
        // such as Safari for iOS, Chrome for iOS, and in-app browsers.
        if (WINDOW.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(WINDOW.navigator.userAgent)) {
          // Fix the `The operation is insecure` error (#57)
          image.crossOrigin = 'anonymous';
        }
        image.alt = file.name;
        image.src = data.url;
      }
    }, {
      key: "draw",
      value: function draw(_ref2) {
        var _this3 = this;
        var naturalWidth = _ref2.naturalWidth,
          naturalHeight = _ref2.naturalHeight,
          _ref2$rotate = _ref2.rotate,
          rotate = _ref2$rotate === void 0 ? 0 : _ref2$rotate,
          _ref2$scaleX = _ref2.scaleX,
          scaleX = _ref2$scaleX === void 0 ? 1 : _ref2$scaleX,
          _ref2$scaleY = _ref2.scaleY,
          scaleY = _ref2$scaleY === void 0 ? 1 : _ref2$scaleY;
        var file = this.file,
          image = this.image,
          options = this.options;
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var is90DegreesRotated = Math.abs(rotate) % 180 === 90;
        var resizable = (options.resize === 'contain' || options.resize === 'cover') && isPositiveNumber(options.width) && isPositiveNumber(options.height);
        var maxWidth = Math.max(options.maxWidth, 0) || Infinity;
        var maxHeight = Math.max(options.maxHeight, 0) || Infinity;
        var minWidth = Math.max(options.minWidth, 0) || 0;
        var minHeight = Math.max(options.minHeight, 0) || 0;
        var aspectRatio = naturalWidth / naturalHeight;
        var width = options.width,
          height = options.height;
        if (is90DegreesRotated) {
          var _ref3 = [maxHeight, maxWidth];
          maxWidth = _ref3[0];
          maxHeight = _ref3[1];
          var _ref4 = [minHeight, minWidth];
          minWidth = _ref4[0];
          minHeight = _ref4[1];
          var _ref5 = [height, width];
          width = _ref5[0];
          height = _ref5[1];
        }
        if (resizable) {
          aspectRatio = width / height;
        }
        var _getAdjustedSizes = getAdjustedSizes({
          aspectRatio: aspectRatio,
          width: maxWidth,
          height: maxHeight
        }, 'contain');
        maxWidth = _getAdjustedSizes.width;
        maxHeight = _getAdjustedSizes.height;
        var _getAdjustedSizes2 = getAdjustedSizes({
          aspectRatio: aspectRatio,
          width: minWidth,
          height: minHeight
        }, 'cover');
        minWidth = _getAdjustedSizes2.width;
        minHeight = _getAdjustedSizes2.height;
        if (resizable) {
          var _getAdjustedSizes3 = getAdjustedSizes({
            aspectRatio: aspectRatio,
            width: width,
            height: height
          }, options.resize);
          width = _getAdjustedSizes3.width;
          height = _getAdjustedSizes3.height;
        } else {
          var _getAdjustedSizes4 = getAdjustedSizes({
            aspectRatio: aspectRatio,
            width: width,
            height: height
          });
          var _getAdjustedSizes4$wi = _getAdjustedSizes4.width;
          width = _getAdjustedSizes4$wi === void 0 ? naturalWidth : _getAdjustedSizes4$wi;
          var _getAdjustedSizes4$he = _getAdjustedSizes4.height;
          height = _getAdjustedSizes4$he === void 0 ? naturalHeight : _getAdjustedSizes4$he;
        }
        width = Math.floor(normalizeDecimalNumber(Math.min(Math.max(width, minWidth), maxWidth)));
        height = Math.floor(normalizeDecimalNumber(Math.min(Math.max(height, minHeight), maxHeight)));
        var destX = -width / 2;
        var destY = -height / 2;
        var destWidth = width;
        var destHeight = height;
        var params = [];
        if (resizable) {
          var srcX = 0;
          var srcY = 0;
          var srcWidth = naturalWidth;
          var srcHeight = naturalHeight;
          var _getAdjustedSizes5 = getAdjustedSizes({
            aspectRatio: aspectRatio,
            width: naturalWidth,
            height: naturalHeight
          }, {
            contain: 'cover',
            cover: 'contain'
          }[options.resize]);
          srcWidth = _getAdjustedSizes5.width;
          srcHeight = _getAdjustedSizes5.height;
          srcX = (naturalWidth - srcWidth) / 2;
          srcY = (naturalHeight - srcHeight) / 2;
          params.push(srcX, srcY, srcWidth, srcHeight);
        }
        params.push(destX, destY, destWidth, destHeight);
        if (is90DegreesRotated) {
          var _ref6 = [height, width];
          width = _ref6[0];
          height = _ref6[1];
        }
        canvas.width = width;
        canvas.height = height;
        if (!isImageType(options.mimeType)) {
          options.mimeType = file.type;
        }
        var fillStyle = 'transparent';

        // Converts PNG files over the `convertSize` to JPEGs.
        if (file.size > options.convertSize && options.convertTypes.indexOf(options.mimeType) >= 0) {
          options.mimeType = 'image/jpeg';
        }
        var isJPEGImage = options.mimeType === 'image/jpeg';
        if (isJPEGImage) {
          fillStyle = '#fff';
        }

        // Override the default fill color (#000, black)
        context.fillStyle = fillStyle;
        context.fillRect(0, 0, width, height);
        if (options.beforeDraw) {
          options.beforeDraw.call(this, context, canvas);
        }
        if (this.aborted) {
          return;
        }
        context.save();
        context.translate(width / 2, height / 2);
        context.rotate(rotate * Math.PI / 180);
        context.scale(scaleX, scaleY);
        context.drawImage.apply(context, [image].concat(params));
        context.restore();
        if (options.drew) {
          options.drew.call(this, context, canvas);
        }
        if (this.aborted) {
          return;
        }
        var callback = function callback(blob) {
          if (!_this3.aborted) {
            var done = function done(result) {
              return _this3.done({
                naturalWidth: naturalWidth,
                naturalHeight: naturalHeight,
                result: result
              });
            };
            if (blob && isJPEGImage && options.retainExif && _this3.exif && _this3.exif.length > 0) {
              var next = function next(arrayBuffer) {
                return done(toBlob(arrayBufferToDataURL(insertExif(arrayBuffer, _this3.exif), options.mimeType)));
              };
              if (blob.arrayBuffer) {
                blob.arrayBuffer().then(next).catch(function () {
                  _this3.fail(new Error('Failed to read the compressed image with Blob.arrayBuffer().'));
                });
              } else {
                var reader = new FileReader$1();
                _this3.reader = reader;
                reader.onload = function (_ref7) {
                  var target = _ref7.target;
                  next(target.result);
                };
                reader.onabort = function () {
                  _this3.fail(new Error('Aborted to read the compressed image with FileReader.'));
                };
                reader.onerror = function () {
                  _this3.fail(new Error('Failed to read the compressed image with FileReader.'));
                };
                reader.onloadend = function () {
                  _this3.reader = null;
                };
                reader.readAsArrayBuffer(blob);
              }
            } else {
              done(blob);
            }
          }
        };
        if (canvas.toBlob) {
          canvas.toBlob(callback, options.mimeType, options.quality);
        } else {
          callback(toBlob(canvas.toDataURL(options.mimeType, options.quality)));
        }
      }
    }, {
      key: "done",
      value: function done(_ref8) {
        var naturalWidth = _ref8.naturalWidth,
          naturalHeight = _ref8.naturalHeight,
          result = _ref8.result;
        var file = this.file,
          image = this.image,
          options = this.options;
        if (URL$1 && image.src.indexOf('blob:') === 0) {
          URL$1.revokeObjectURL(image.src);
        }
        if (result) {
          // Returns original file if the result is greater than it and without size related options
          if (options.strict && !options.retainExif && result.size > file.size && options.mimeType === file.type && !(options.width > naturalWidth || options.height > naturalHeight || options.minWidth > naturalWidth || options.minHeight > naturalHeight || options.maxWidth < naturalWidth || options.maxHeight < naturalHeight)) {
            result = file;
          } else {
            var date = new Date();
            result.lastModified = date.getTime();
            result.lastModifiedDate = date;
            result.name = file.name;

            // Convert the extension to match its type
            if (result.name && result.type !== file.type) {
              result.name = result.name.replace(REGEXP_EXTENSION, imageTypeToExtension(result.type));
            }
          }
        } else {
          // Returns original file if the result is null in some cases.
          result = file;
        }
        this.result = result;
        if (options.success) {
          options.success.call(this, result);
        }
      }
    }, {
      key: "fail",
      value: function fail(err) {
        var options = this.options;
        if (options.error) {
          options.error.call(this, err);
        } else {
          throw err;
        }
      }
    }, {
      key: "abort",
      value: function abort() {
        if (!this.aborted) {
          this.aborted = true;
          if (this.reader) {
            this.reader.abort();
          } else if (!this.image.complete) {
            this.image.onload = null;
            this.image.onabort();
          } else {
            this.fail(new Error('The compression process has been aborted.'));
          }
        }
      }

      /**
       * Get the no conflict compressor class.
       * @returns {Compressor} The compressor class.
       */
    }], [{
      key: "noConflict",
      value: function noConflict() {
        window.Compressor = AnotherCompressor;
        return Compressor;
      }

      /**
       * Change the default options.
       * @param {Object} options - The new default options.
       */
    }, {
      key: "setDefaults",
      value: function setDefaults(options) {
        _extends(DEFAULTS, options);
      }
    }]);
    return Compressor;
  }();

  "stream"in Blob.prototype||Object.defineProperty(Blob.prototype,"stream",{value(){return new Response(this).body}}),"setBigUint64"in DataView.prototype||Object.defineProperty(DataView.prototype,"setBigUint64",{value(e,n,t){const i=Number(0xffffffffn&n),r=Number(n>>32n);this.setUint32(e+(t?0:4),i,t),this.setUint32(e+(t?4:0),r,t);}});var e=e=>new DataView(new ArrayBuffer(e)),n=e=>new Uint8Array(e.buffer||e),t=e=>(new TextEncoder).encode(String(e)),i=e=>Math.min(4294967295,Number(e)),r=e=>Math.min(65535,Number(e));function f(e,i){if(void 0===i||i instanceof Date||(i=new Date(i)),e instanceof File)return {isFile:1,t:i||new Date(e.lastModified),i:e.stream()};if(e instanceof Response)return {isFile:1,t:i||new Date(e.headers.get("Last-Modified")||Date.now()),i:e.body};if(void 0===i)i=new Date;else if(isNaN(i))throw new Error("Invalid modification date.");if(void 0===e)return {isFile:0,t:i};if("string"==typeof e)return {isFile:1,t:i,i:t(e)};if(e instanceof Blob)return {isFile:1,t:i,i:e.stream()};if(e instanceof Uint8Array||e instanceof ReadableStream)return {isFile:1,t:i,i:e};if(e instanceof ArrayBuffer||ArrayBuffer.isView(e))return {isFile:1,t:i,i:n(e)};if(Symbol.asyncIterator in e)return {isFile:1,t:i,i:o(e[Symbol.asyncIterator]())};throw new TypeError("Unsupported input format.")}function o(e,n=e){return new ReadableStream({async pull(n){let t=0;for(;n.desiredSize>t;){const i=await e.next();if(!i.value){n.close();break}{const e=a(i.value);n.enqueue(e),t+=e.byteLength;}}},cancel(e){n.throw?.(e);}})}function a(e){return "string"==typeof e?t(e):e instanceof Uint8Array?e:n(e)}function s(e,i,r){let[f,o]=function(e){return e?e instanceof Uint8Array?[e,1]:ArrayBuffer.isView(e)||e instanceof ArrayBuffer?[n(e),1]:[t(e),0]:[void 0,0]}(i);if(e instanceof File)return {o:d(f||t(e.name)),u:BigInt(e.size),l:o};if(e instanceof Response){const n=e.headers.get("content-disposition"),i=n&&n.match(/;\s*filename\*?=["']?(.*?)["']?$/i),a=i&&i[1]||e.url&&new URL(e.url).pathname.split("/").findLast(Boolean),s=a&&decodeURIComponent(a),u=r||+e.headers.get("content-length");return {o:d(f||t(s)),u:BigInt(u),l:o}}return f=d(f,void 0!==e||void 0!==r),"string"==typeof e?{o:f,u:BigInt(t(e).length),l:o}:e instanceof Blob?{o:f,u:BigInt(e.size),l:o}:e instanceof ArrayBuffer||ArrayBuffer.isView(e)?{o:f,u:BigInt(e.byteLength),l:o}:{o:f,u:u(e,r),l:o}}function u(e,n){return n>-1?BigInt(n):e?void 0:0n}function d(e,n=1){if(!e||e.every((c=>47===c)))throw new Error("The file must have a name.");if(n)for(;47===e[e.length-1];)e=e.subarray(0,-1);else 47!==e[e.length-1]&&(e=new Uint8Array([...e,47]));return e}var l=new Uint32Array(256);for(let e=0;e<256;++e){let n=e;for(let e=0;e<8;++e)n=n>>>1^(1&n&&3988292384);l[e]=n;}function y(e,n=0){n^=-1;for(var t=0,i=e.length;t<i;t++)n=n>>>8^l[255&n^e[t]];return (-1^n)>>>0}function B(e,n,t=0){const i=e.getSeconds()>>1|e.getMinutes()<<5|e.getHours()<<11,r=e.getDate()|e.getMonth()+1<<5|e.getFullYear()-1980<<9;n.setUint16(t,i,1),n.setUint16(t+2,r,1);}function w({o:e,l:n},t){return 8*(!n||(t??function(e){try{b.decode(e);}catch{return 0}return 1}(e)))}var b=new TextDecoder("utf8",{fatal:1});function p(t,i=0){const r=e(30);return r.setUint32(0,1347093252),r.setUint32(4,754976768|i),B(t.t,r,10),r.setUint16(26,t.o.length,1),n(r)}async function*g(e){let{i:n}=e;if("then"in n&&(n=await n),n instanceof Uint8Array)yield n,e.m=y(n,0),e.u=BigInt(n.length);else {e.u=0n;const t=n.getReader();for(;;){const{value:n,done:i}=await t.read();if(i)break;e.m=y(n,e.m),e.u+=BigInt(n.length),yield n;}}}function I(t,r){const f=e(16+(r?8:0));return f.setUint32(0,1347094280),f.setUint32(4,t.isFile?t.m:0,1),r?(f.setBigUint64(8,t.u,1),f.setBigUint64(16,t.u,1)):(f.setUint32(8,i(t.u),1),f.setUint32(12,i(t.u),1)),n(f)}function v(t,r,f=0,o=0){const a=e(46);return a.setUint32(0,1347092738),a.setUint32(4,755182848),a.setUint16(8,2048|f),B(t.t,a,12),a.setUint32(16,t.isFile?t.m:0,1),a.setUint32(20,i(t.u),1),a.setUint32(24,i(t.u),1),a.setUint16(28,t.o.length,1),a.setUint16(30,o,1),a.setUint16(40,t.isFile?33204:16893,1),a.setUint32(42,i(r),1),n(a)}function h(t,i,r){const f=e(r);return f.setUint16(0,1,1),f.setUint16(2,r-4,1),16&r&&(f.setBigUint64(4,t.u,1),f.setBigUint64(12,t.u,1)),f.setBigUint64(r-8,i,1),n(f)}function D(e){return e instanceof File||e instanceof Response?[[e],[e]]:[[e.input,e.name,e.size],[e.input,e.lastModified]]}var S=e=>function(e){let n=BigInt(22),t=0n,i=0;for(const r of e){if(!r.o)throw new Error("Every file must have a non-empty name.");if(void 0===r.u)throw new Error(`Missing size for file "${(new TextDecoder).decode(r.o)}".`);const e=r.u>=0xffffffffn,f=t>=0xffffffffn;t+=BigInt(46+r.o.length+(e&&8))+r.u,n+=BigInt(r.o.length+46+(12*f|28*e)),i||(i=e);}return (i||t>=0xffffffffn)&&(n+=BigInt(76)),n+t}(function*(e){for(const n of e)yield s(...D(n)[0]);}(e));function A(e,n={}){const t={"Content-Type":"application/zip","Content-Disposition":"attachment"};return ("bigint"==typeof n.length||Number.isInteger(n.length))&&n.length>0&&(t["Content-Length"]=String(n.length)),n.metadata&&(t["Content-Length"]=String(S(n.metadata))),new Response(N(e,n),{headers:t})}function N(t,a={}){const u=function(e){const n=e[Symbol.iterator in e?Symbol.iterator:Symbol.asyncIterator]();return {async next(){const e=await n.next();if(e.done)return e;const[t,i]=D(e.value);return {done:0,value:Object.assign(f(...i),s(...t))}},throw:n.throw?.bind(n),[Symbol.asyncIterator](){return this}}}(t);return o(async function*(t,f){const o=[];let a=0n,s=0n,u=0;for await(const e of t){const n=w(e,f.buffersAreUTF8);yield p(e,n),yield e.o,e.isFile&&(yield*g(e));const t=e.u>=0xffffffffn,i=12*(a>=0xffffffffn)|28*t;yield I(e,t),o.push(v(e,a,n,i)),o.push(e.o),i&&o.push(h(e,a,i)),t&&(a+=8n),s++,a+=BigInt(46+e.o.length)+e.u,u||(u=t);}let d=0n;for(const e of o)yield e,d+=BigInt(e.length);if(u||a>=0xffffffffn){const t=e(76);t.setUint32(0,1347094022),t.setBigUint64(4,BigInt(44),1),t.setUint32(12,755182848),t.setBigUint64(24,s,1),t.setBigUint64(32,s,1),t.setBigUint64(40,d,1),t.setBigUint64(48,a,1),t.setUint32(56,1347094023),t.setBigUint64(64,a+d,1),t.setUint32(72,1,1),yield n(t);}const l=e(22);l.setUint32(0,1347093766),l.setUint16(8,r(s),1),l.setUint16(10,r(s),1),l.setUint32(12,i(d),1),l.setUint32(16,i(a),1),yield n(l);}(u,a),u)}

  class DropImages {
      constructor() {
          this.dropZone = document.querySelector('#dropzone');
          this.downloadAllButton = document.querySelector('a#download-all');
          this.tbody = document.querySelector('tbody#table-body');
      }

      reset() {
          console.log('DropImages.reset()');
          this.downloadAllButton.classList.add('d-none');
          this.tbody.innerHTML = '';
      }

      preventDefaults(e) {
          e.preventDefault();
          e.stopPropagation();
      }

      highlight() {
          this.dropZone.classList.remove('bg-body-tertiary');
          this.dropZone.classList.add('bg-body-secondary');
      }

      unhighlight() {
          this.dropZone.classList.remove('bg-body-secondary');
          this.dropZone.classList.add('bg-body-tertiary');
      }

      async handleFiles(files) {
          [...files].forEach((file) => {
              const reader = new FileReader();

              reader.onload = async (e) => {
                  const src = e.target.result;

                  await new Compressor(file, {
                      quality: 0.8,
                      maxWidth: 800,
                      success(result) {
                          const imageURL = URL.createObjectURL(result);

                          dropImages.appendRow({
                              src,
                              name: result.name,
                              originalSize: file.size,
                              compressedSize: result.size,
                              imageURL
                          });
                      },
                      error(err) {
                          console.log(err.message);
                      },
                  });
              };

              reader.readAsDataURL(file);
          });

          await this.createBatchDownload(files);
      }

      byteConverter(bytes, decimals) {
          const K_UNIT = 1024;
          const SIZES = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

          if (bytes === 0) return "0 Byte";

          let i = Math.floor(Math.log(bytes) / Math.log(K_UNIT));

          return parseFloat((bytes / Math.pow(K_UNIT, i)).toFixed(decimals)) + " " + SIZES[i];
      }


      async appendRow({src, name, originalSize, compressedSize, imageURL}) {
          const table = document.querySelector('table.table');
          table.classList.remove('d-none');
          const tbody = document.querySelector('tbody#table-body');
          const row = document.createElement('tr');

          const td1 = document.createElement('td');
          td1.classList.add('align-middle');
          const img = document.createElement("img");
          img.src = src;
          img.classList.add('img-thumbnail');
          img.width = 100;
          td1.appendChild(img);
          row.appendChild(td1);

          const td2 = document.createElement('td');
          td2.innerHTML = this.byteConverter(originalSize, 2) ?? "Loading...";
          td2.classList.add('align-middle');
          row.appendChild(td2);

          const td3 = document.createElement('td');
          td3.innerHTML = this.byteConverter(compressedSize, 2) ?? "Loading...";
          td3.classList.add('align-middle');
          row.appendChild(td3);

          const td4 = document.createElement('td');
          td4.innerHTML = `${Math.floor(100 - (compressedSize * 100 / originalSize))}%`;
          td4.classList.add('align-middle');
          row.appendChild(td4);

          const td5 = document.createElement('td');
          td5.classList.add('align-middle');
          td5.innerHTML = '<a href="' + imageURL + '" download="' + "image" + '" class="btn btn-primary">Download</a>';
          row.appendChild(td5);

          tbody.appendChild(row);
      }

      async handleDrop(e) {
          this.reset();

          let dt = e.dataTransfer;
          let files = dt.files;

          await this.handleFiles(files);
      }

      async createBatchDownload(files) {
          const blob = await A([...files], {
              filename: 'images.zip',
              progress: (index, max) => {
                  console.log(`progress: ${index} / ${max}`);
              },
          }).blob();

          console.log(this.downloadAllButton);

          this.downloadAllButton.classList.remove('d-none');
          this.downloadAllButton.classList.add("disabled");
          this.downloadAllButton.href = URL.createObjectURL(blob);
          this.downloadAllButton.download = "images.zip";
          this.downloadAllButton.innerHTML = "Download All";
          this.downloadAllButton.classList.remove("disabled");
      }


      addEventListeners() {
          ['dragenter', 'dragover'].forEach((eventName) => {
              this.dropZone.addEventListener(
                  eventName,
                  (e) => {
                      this.preventDefaults(e);
                      this.highlight();
                  },
                  false
              );
          });

          ['dragleave', 'drop'].forEach(eventName => {
              this.dropZone.addEventListener(
                  eventName,
                  (e) => {
                      this.preventDefaults(e);
                      this.unhighlight();
                  },
                  false
              );
          });

          this.dropZone.addEventListener(
              'drop', async (e) => {
                  this.preventDefaults(e);

                  await this.handleDrop(e);
              },
              false
          );
      }

      init() {
          console.log('DropImages.init()');

          this.reset();

          this.addEventListeners();
      }
  }

  const dropImages = new DropImages();
  dropImages.init();

  return DropImages;

})();
