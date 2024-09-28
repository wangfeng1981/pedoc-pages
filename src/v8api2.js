/**
 * 
 * @file
 * 总体介绍
 * OEE以瓦片为单位完成计算。瓦片的坐标为WGS84坐标，每个瓦片的尺寸为256x256。
 * 对于多波段数据采用BSQ顺序存储。每个瓦片的左上角为图像坐标的0，0点。x坐标向右增大，y坐标向下增大。
 * OEE的v8脚本算子主要变量和类为：全局变量（pe），数据集类（Dataset），几何数据类（Geometry）。
 * 一个脚本会同样的对每个瓦片进行计算。每个脚本需要有一个主函数main作为入口，
 * 该函数必须返回一个Dataset或者返回null。 
 * Dataset数据集表示一期影像数据。
 * Geometry几何数据类采用wkt标准进行构造。 
 * 
 * 假设数据最底层z=6，那么该层的分辨率reso= 360.0/pow(2,6)/256.0 。
 * 对于给定的经纬度 lon 和lat ，计算瓦片编号公式为：
 * z 提前给定不需要计算。
 * x = floor（lon + 180）/ reso / 256.0 ;
 * y = floor( lat - 90 )/(-reso)/256.0 ; 
 * 在瓦片中的行列号为：
 * col = mod( (lon+180)/reso , 256);
 * row = mod( (lat-90)/-reso , 256 );
 * 
 */


/**
 * 全局变量PixelEngine
 */
var pe=new PixelEngine;


/**
 * 数据集时间集合。等待补充。
 */
class DateTimeCollection {

}


/**
 * PixelEngine
 */
class PixelEngine {
	/**
	 * 单字节数据类型，该常量值为1。
	 * @example  
	 * let dt=pe.DataTypeByte;
	 */
	DataTypeByte=1;
	/**
	 * 两字节无符号整型数据类型，该常量值为2。
	 * @example  
	 * let dt=pe.DataTypeUint16;
	 */
	DataTypeUint16 = 2;
	/**
	 * 两字节有符号整型数据类型，该常量值为3。
	 * @example  
	 * let dt=pe.DataTypeInt16;
	 */
	DataTypeInt16 = 3;
	/**
	 * 四字节无符号整型数据类型，该常量值为4。
	 * @example  
	 * let dt=pe.DataTypeUint32;
	 */
	DataTypeUint32 = 4;
	/**
	 * 四字节有符号整型数据类型，该常量值为5。
	 * @example  
	 * let dt=pe.DataTypeInt32;
	 */
	DataTypeInt32 = 5;
	/**
	 * 四字节浮点数据类型，该常量值为6。
	 * @example  
	 * let dt=pe.DataTypeFloat32;
	 */
	DataTypeFloat32 = 6;
	/**
	 * 八字节浮点数据类型，该常量值为7。
	 * @example  
	 * let dt=pe.DataTypeFloat64;
	 */
	DataTypeFloat64 = 7;
	/**
 	* 合成方法类型，最小合成，常量值为1.
 	*/
	CompositeMethodMin=1;
	/**
 	* 合成方法类型，最大合成，常量值为2.
 	*/
	CompositeMethodMax=2;
	/**
 	* 合成方法类型，平均合成，常量值为3.
 	*/
	CompositeMethodAve=3;
	/**
 	* 合成方法类型，求和合成，常量值为4.
 	*/
	CompositeMethodSum=4;
	/**
 	* 合成方法类型，计数合成，常量值为5.
 	*/
	CompositeMethodCnt=5;




	/**
	 * 创建一个空瓦片数据
	 * @example  
	 * //构建一个三波段256x256瓦片数据。
	 * var dataset=pe.NewDataset(pe.DataTypeByte,256,256,3);
	 * 
	 * @param {*} datatype 数据类型pe.DataTypeByte等
	 * @param {*} width 瓦片数据宽度必须256，以后可能会支持不同瓦片尺寸
	 * @param {*} height 瓦片数据宽度必须256，以后可能会支持不同瓦片尺寸
	 * @param {*} nband 瓦片数据波段数，必须大于0
	 * @returns {Dataset} 返回瓦片数据 
	 * 
	 */
	NewDataset(datatype,width,height,nband){
		return Dataset;
	}

	/**
	 * 创建一个空瓦片数据，并使用初始值初始化全部像素值。
	 * @param {*} datatype 数据类型pe.DataTypeByte等
	 * @param {*} w 瓦片数据宽度必须256，以后可能会支持不同瓦片尺寸
	 * @param {*} h 瓦片数据宽度必须256，以后可能会支持不同瓦片尺寸
	 * @param {*} nb 瓦片数据波段数，必须大于0
	 * @param {Number} initval 初始值
	 * @returns {Dataset} 返回瓦片数据 
	 * @example
	 * let ds=pe.NewDataset(pe.DataTypeByte,256,256,1,255);
	 */
	NewDataset(datatype,w,h,nb,initval){ return Dataset; }




	/**
	 * 从后台获取某个数据集的瓦片数据。
	 * @param {String} datasetName 数据集名称，使用通常命名变量的规则进行定义，与后台协商好即可，没有强制要求，建议使用文件路径的形式表示，比如 GFS/TEMP/5000M , FY3D/MERSI/L2/NVI/MON。
	 * @param {Number} datetime 数据日期时间，这里只要和后台协商好即可没有强制要求，建议采用yyyyMMddHHmmss 14位数字表示日期和时间。
	 * @param {*} bandIndices 波段索引值的数组，可选参数，省略该参数返回全部波段。
	 * @returns {Dataset} 成功返回Dataset瓦片数据对象，失败返回null.
	 * @example
	 * let dataset=pe.Dataset("GFS/TEMP/5000M", 20240101000000);
	 */
	Dataset(datasetName, datetime, [bandIndices]) {
		return Dataset;
	}
	
	/**
	 * 等待补充
	 * @example
	 *  pe.DatasetCollection("dsname",[20010101030405,...])
	 * @example
	 *  pe.DatasetCollection("dsname",datetimeCollection)
	 */
	DatasetArray() {}
	
	/**
	 * 等待补充
	 */
	DataFile() {}


	

	/**
	 * 构建某个数据集的时间集合。
	 * @param {String} dsName 数据集名称。
	 * @param {*} wholeStart 整体开始日期时间。
	 * @param {*} wholeStartInc 是否包含开始日期时间，取值0或者1.
	 * @param {*} wholeStop 整体结束日期时间。
	 * @param {*} wholeStopInc 是否包含结束日期时间，取值0或者1.
	 * @param {*} repeatType 重复周期，取值"" 无重复周期 ,"m" 按月重复 ,"y" 按年重复.
	 * @param {*} repeatStart 重复周期开始。
	 * @param {*} repeatStartInc 重复周期是否包含开始时间，0或者1.
	 * @param {*} repeatStop 重复周期结束。
	 * @param {*} repeatStopInc 重复周期是否包含结束时间，0或者1.
	 * @param {*} repeatStopNextYear 重复周期结束日期是否跨年，0表示不跨年，1表示跨一年，2表示跨2年，以此类推。
	 * @returns {DateTimeCollection} 返回数据集时间集合，失败返回null。
	 * @example
	 * const dtcollections=pe.RemoteBuildDtCollections("FY3D/MERSI/L2/NVI/MON",20200101000000,1,20231231000000,0,"",0,0,0,0,0) ;
	 */
	RemoteBuildDtCollections(dsName,wholeStart,wholeStartInc,wholeStop,wholeStopInc,repeatType,repeatStart,repeatStartInc,repeatStop,repeatStopInc,repeatStopNextYear){
		return DateTimeCollection;
	}

	/**
	 * 根据输入年月日和天数，输出时间数据集。
	 * @param {Number} year 
	 * @param {Number} month 
	 * @param {Number} day 
	 * @param {Number} ndaysBefore 
	 * @returns {DateTimeCollection}
	 * @example
	 * 需要完善
	 * const dtcollection=pe.LocalBuildDtCollectionByStopDt(2024,5,1,10);
	 */
	LocalBuildDtCollectionByStopDt(year,month,day,ndaysBefore) {
		return DateTimeCollection;
	}

	/**
	 * 将多个瓦片数据按出现顺序组合成多波段瓦片数据。
	 * @param {*} datasetArray 数据集数组。
	 * @returns {Dataset} 返回合成后的瓦片数据，返回结果的波段数等于输入数据的波段之和。如果失败返回null，如果有一个dataset为null也会失败并返回null.
	 * @example
	 * let new3BandsDataset = pe.StackDatasets([dataset0, dataset1, dataset2]) ;
	 */
	StackDatasets(datasetArray) { return Dataset; }


	/**
	 * 通过输入wkt字符串构建一个几何体对象.
	 * @param {String} wktText wkt格式字符串。
	 * @returns {Geometry} 返回几何体，失败返回null。
	 * @example
	 * let geometry=pe.geomByWkt("POINT(120 30)");
	 */
	geomByWkt(wktText) { return Geometry ; }
	
	/**
	 * 通过wktId从后台获取wkt字符串并构建几何体。
	 * @param {String} wktId 与后台约定好的wkt标识，建议采用文件路径的格式进行定义，建议增加扩展名.wkt。
	 * @returns {Geometry} 返回几何体对象，失败返回null。
	 * @example
	 * let geometry=pe.geomById("some/dir/geom.wkt") ;
	 */
	geomById(wktId){return Geometry;}

	/**
	 * 打印日志信息到后台。后台可以理解为java程序，通过该接口打印的日志会传递给java的后台程序，用于提供给客户额外错误信息。
	 * @param {String} text 
	 * @example
	 * pe.log("Hello world.");
	 */
	log(text){ }


	/**
	 * 
	 * @param {String} text 
	 * @example
	 * pe.log("Hello world.");
	 */

	/**
	 * 多个数据对象计算合成结果，合成方法包括最小1，最大2，平均3，求和4，计数5。
	 * @param {Array} dsArray 需要合成的数据对象数组，要求波段数一致，数据类型一致。  
	 * @param {Number} method 合成方法最小1，最大2，平均3，求和4，计数5
	 * @param {Number} validMinInc 合成有效区间下限，包含。
	 * @param {Number} validMaxInc 合成有效区间上限，包含。
	 * @param {Number} fillValue 填充值。
	 * @param {Number} outType  结果输出类型，1-uint8 2-uint16 3-int16 4-uint32 5-int32 6-f32 7-f64
	 * @returns {Dataset} 返回合成后的数据对象。
	 * @example
	 * //最大合成
	 * let dataset=pe.compose2([ds1,ds2,ds3,ds4,ds5], 2, 1, 255, 0, 1);
	 */
	compose2(dsArray,method,validMinInc,validMaxInc,fillValue,outType){ return null;}


	/**
	 * 通过Geometry对象将空间分为内（inside）和外（outside）两个部分，使用 insideDataset 填充空间内像素，使用 outsideDataset 填充空间外部数据。该函数用于避免使用Geometry进行复杂mask操作。
	 * @param {Geometry} geometryObject 几何体对象，要求是Polygon或者MultiPolygon。
	 * @param {Dataset} insideDataset 填充几何体内部的数据。
	 * @param {Dataset} outsideDataset 填充几何体外部的数据。
	 * @returns {Dataset} 返回新的合成后栅格数据对象，失败返回null。
	 * @example
	 * let geometry=pe.geomById("some/dir/geom.wkt") ;
	 * let mergDs = pe.mergeByGeom( geometry, insideDs, outsideDs);
	 */
	mergeByGeom(geometryObject, insideDataset, outsideDataset){return Dataset;}

}

/**
 * 几何体类，可以是点、线、面。可以通过geojson，wkt，wkb等格式数据进行构造。目前pe只支持WGS84坐标。
 */
class Geometry {
	/**
	 * 生成缓冲区。支持点、线、面。生成的缓冲区统一是面类型。
	 * @param {*} radius 缓冲区半径，单位度。
	 * @returns {Geometry} 返回缓冲区的多边形Geometry对象。
	 * @example
	 * let point=pe.geomByWkt("POINT(120 30)");
	 * let bufferGeom = point.buffer(10.0);
	 */
	buffer( radius ){ return null; }

}




/**
 * 数据集，在单个脚本中一般指代该数据集的一个瓦片数据。
 */
class Dataset {
	/**
	 * 数据集裁剪。
	 * @deprecated
	 * @param {*} roiId 
	 * @param {Number} fillvalue
	 * @returns {Dataset}
	 */
	clip(roiId,fillvalue){}
	/**
	 * 数据集裁剪。
	 * @deprecated
	 * @param {*} roiId 
	 * @param {Number} fillvalue
	 * @returns {Dataset}
	 */
	clip2(roiId,fillvalue){}

	/**
	 * 数据集裁剪。支持wkt，wkb，geojson三种格式。裁剪区外部填充值，裁剪区内部保留原始值。
	 * @param {String} roiId 与后台约定感兴趣区标识，调用该函数时pe会通过后台请求对应的感兴趣区数据，并构建裁剪几何。
	 * @param {*} fillvalue 裁剪区外部填充值。
	 * @returns {Dataset} 返回裁剪后数据集，如果该瓦片数据全部在感兴趣区外部返回全部填充值的瓦片（并不会返回null）.
	 */
	clip3(roiId,fillvalue){ return Dataset; }

	/**
	 * 转换瓦片数据数据类型
	 * @example var newds=dataset.convertToDataType(pe.DataTypeFloat32);
	 * @param {*} datatype 目标数据类型{DataTypeByte}等
	 * @returns {Dataset} 返回目标数据类型的瓦片数据，如果失败返回null
	 * 
	 */
	convertToDataType(datatype){
		return Dataset;
	}

	/**
	 * 当前瓦片数据减去瓦片数据B，返回差值后的瓦片数据，要求两个数据集波段相同。
	 * @param {*} datasetB 数据集B
	 * @param {*} validmin 计算有效区间最小值包含。
	 * @param {*} validmax 计算有效区间最大值包含。
	 * @param {*} filldata 有效区间外填充值。
	 * @param {*} outDataType 输出数据类型，可选，默认使用当前数据集的类型。
	 * @returns {Dataset} 返回差值结果瓦片数据。
	 * @example
	 * let dsResult = datasetA.subtract( datasetB, 0, 254, 255  );
	 */
	subtract( datasetB, validmin, validmax, filldata ,outDataType ){}
	
	/**
	 * 从多波段瓦片数据中提取单个波段数据。
	 * @param {Number} bandindex 提取波段索引值，从0开始计。该值必须小于瓦片的波段数。
	 * @returns {Dataset} 
	 * @example
	 * let redbandDs = rgbDataset.extract(0) ;
	 */
	datasetA(bandindex) { return Dataset }

	/**
	 * 针对当前瓦片数据构建0，1值组成的单波段Byte型掩膜数据。
	 * @param {Number} targetValue 当前瓦片数据像素值等于该值时输出1，反之输出0.
	 * @returns {Dataset} 掩膜数据。
	 * @example
	 * let maskds = datasetA.buildmask( 128 );// all pixel of value=128 will be 1, others will be 0.
	 */
	buildmask( targetValue ){return null;}

	/**
	 *  针对当前瓦片数据在一个最小值和最大值范围内的像素构建0，1值组成的单波段Byte型掩膜数据。
	 * @param {Number} targetValueMin 当前瓦片数据在这个targetValueMin（含），targetValueMax（含）范围内的返回1，反之返回0.
	 * @param {Number} targetValueMax 当前瓦片数据在这个targetValueMin（含），targetValueMax（含）范围内的返回1，反之返回0.
	 * @returns {Dataset} 掩膜数据。
	 * @example
	 * let maskds = datasetA.buildmask2( 0.0 , 254.0 );
	 */
	buildmask2( targetValueMin,targetValueMax){return null;}

	/**
	 * 对当前瓦片数据进行掩膜操作，结果保留在当前对象中，不返回新数据。
	 * @param {Dataset} maskDataset 掩膜瓦片数据，必须是Byte型单波段数据，当前瓦片数据对应掩膜像素为1的保留，反之使用填充值填充。
	 * @param {*} fillValue 填充值。
	 * @example
	 * let maskds=dataset1.buildmask2(0.0,254.0,1) ;
	 * datasetSelf.mask( maskds , 255 ) ;
	 */
	mask( maskDataset, fillValue ) {  }

	/**
	 * 对当前瓦片数据指定值进行重映射，其他值不变。
	 * @param {*} oldValue 原始像素值。
	 * @param {*} newValue 映射为新的像素值。
	 * @example
	 * datasetSelf.map( 128 , 255 );
	 */
	map(oldValue, newValue){ } 

	/**
	 * 对当前瓦片数据指定范围值进行重映射，其他值不变。
	 * @param {*} oldValueMin 指定范围最小值（含）。
	 * @param {*} oldValueMax 指定范围最大值（含）。
	 * @param {*} newValue 映射为新值。
	 * @example
	 * datasetSelf.map2( 0, 128, 255 ) ;
	 */
	map2(oldValueMin,oldValueMax,newValue){  }

	/**
	 * 将指定值烧录到当前数据集的副本上并返回该副本，烧录的数据在返回数据中，不会写入当前瓦片数据。对于几何体以外的数据保留原始值不做处理。
	 * @param {Geometry} geometry 几何体数据，可以是点、线、面。
	 * @param {*} burnValue 烧录值。
	 * @returns {Dataset} 返回烧录后结果。
	 * @example
	 * let geom=pe.geomByWkt("POINT(120 30)");
	 * let burnedDataset=datasetA.burn( geom, 244 ) ;
	 */
	burn( geometry , burnValue ){ return null; }

	/**
	 * 使用几何体对数据集进行裁剪，并返回裁剪后的结果。裁剪区外边使用填充值填充。
	 * @param {Geometry} geometry 几何体。
	 * @param {*} fillValue 填充值。
	 * @returns {Dataset} 返回裁剪结果，对于瓦片数据完全在几何体之外的，返回全填充值瓦片。
	 * @example
	 * let point = pe.geomByWkt("POINT(120 30)");
	 * let geom = point.buffer(10);//in degree.
	 * let clipedDs = datasetA.clipByGeometry(geom, 0) ;
	 */
	clipByGeometry( geometry , fillValue ) { return null; }

	/**
	 * 将当前瓦片数据的副本转换为Byte型返回。
	 * @returns {Dataset}
	 * @example
	 * let ds=dataset.toByte();
	 */
	toByte(){ return null ; }

	/**
	 * 将当前瓦片数据的副本转换为unsigned int16型返回。
	 * @returns {Dataset}
	 * @example
	 * let ds=dataset.toUint16();
	 */
	toUint16(){return null; }

	/**
	 * 将当前瓦片数据的副本转换为 int16型返回。
	 * @returns {Dataset}
	 * @example
	 * let ds=dataset.toInt16();
	 */
	toInt16(){return null; }

	/**
	 * 将当前瓦片数据的副本转换为 unsigned int32 型返回。
	 * @returns {Dataset}
	 * @example
	 * let ds=dataset.toUint32();
	 */
	toUint32(){return null; }

	/**
	 * 将当前瓦片数据的副本转换为 int32 型返回。
	 * @returns {Dataset}
	 * @example
	 * let ds=dataset.toInt32();
	 */
	toInt32(){return null; }

	/**
	 * 将当前瓦片数据的副本转换为 float32 型返回。
	 * @returns {Dataset}
	 * @example
	 * let ds=dataset.toFloat32();
	 */
	toFloat32(){return null; }

	/**
	 * 将当前瓦片数据的副本转换为 float64 型返回。
	 * @returns {Dataset}
	 * @example
	 * let ds=dataset.toFloat64();
	 */
	toFloat64(){return null; }

	/**
	 * 对当前瓦片数据副本进行逐像素计算，返回计算结果。
	 * @param {Function} callbackFunc 逐像素计算函数，函数样例参考示例，输入参数包括一个当前像素由全部波段数据组成的数组和像素位置。输出数据的波段数由计算函数的第一个返回值决定。
	 * @returns {Dataset} 返回结算后的结果。如果失败返回null。
	 * @example
	 * function calculateNDVI( valArr, index ) {
	 * 	 let ndvi=(valArr[1]-valArr[0])/(valArr[1]+valArr[0]);
	 *   return ndvi; // return [ndvi] ; this is also OK.
	 * }
	 * let newds=dataset.forEachPixel( calculateNDVI ) ;
	 */
	forEachPixel( callbackFunc ) { return null ; }


	/**
	 * 设当前对象为A，计算两个瓦片数据对象逐像素求和 C=A+B，支持多波段，要求波段数必须一致。A和B数据类型可以不一样，开发者需要注意数据溢出的问题，
	 * 返回结果C数据类型与A保持一致。内部调用c++代码计算，效率高。计算结果返回到新的瓦片数据对象C。
	 * @param {Dataset} datasetB 瓦片数据B
	 * @param {Number} validMin A和B有效区间下限，包含。
	 * @param {Number} validMax A和B有效区间上线，包含。
	 * @param {Number} fillData A或B像素不在有效值区间，写入填充值。
	 * @returns {Dataset} 返回结算后的结果。如果失败返回null。
	 * @example
	 * let datasetC=datasetA.add(datasetB, 0, 10000, -1) ;
	 */
	add(datasetB, validMin, validMax, fillData) {return null;}

	/**
	 * 设当前对象为A，计算两个瓦片数据 C=A-B，支持多波段，要求波段数必须一致。A和B数据类型可以不一样，开发者需要注意数据溢出的问题，
	 * 返回结果C数据类型与A保持一致。内部调用c++代码计算，效率高。计算结果返回到新的瓦片数据对象C。
	 * @param {Dataset} datasetB 瓦片数据B
	 * @param {Number} validMin A和B有效区间下限，包含。
	 * @param {Number} validMax A和B有效区间上线，包含。
	 * @param {Number} fillData A或B像素不在有效值区间，写入填充值。
	 * @returns {Dataset} 返回结算后的结果。如果失败返回null。
	 * @example
	 * let datasetC=datasetA.sub(datasetB, 0, 10000, -1) ;
	 */
	sub(datasetB, validMin, validMax, fillData) {return null;}

	/**
	 * 设当前对象为A，计算两个瓦片数据 C=A*B，支持多波段，要求波段数必须一致。A和B数据类型可以不一样，开发者需要注意数据溢出的问题，
	 * 返回结果C数据类型与A保持一致。内部调用c++代码计算，效率高。计算结果返回到新的瓦片数据对象C。
	 * @param {Dataset} datasetB 瓦片数据B
	 * @param {Number} validMin A和B有效区间下限，包含。
	 * @param {Number} validMax A和B有效区间上线，包含。
	 * @param {Number} fillData A或B像素不在有效值区间，写入填充值。
	 * @returns {Dataset} 返回结算后的结果。如果失败返回null。
	 * @example
	 * let datasetC=datasetA.mul(datasetB, 0, 10000, -1) ;
	 */
	mul(datasetB, validMin, validMax, fillData) {return null;}

	/**
	 * 设当前对象为A，计算两个瓦片数据  C=A/B，支持多波段，要求波段数必须一致。A和B数据类型可以不一样，开发者需要注意数据溢出的问题，
	 * 返回结果C数据类型与A保持一致。内部调用c++代码计算，效率高。计算结果返回到新的瓦片数据对象C。
	 * @param {Dataset} datasetB 瓦片数据B
	 * @param {Number} validMin A和B有效区间下限，包含。
	 * @param {Number} validMax A和B有效区间上线，包含。
	 * @param {Number} fillData A或B像素不在有效值区间，写入填充值。B值为0的直接写入填充值。
	 * @returns {Dataset} 返回结算后的结果。如果失败返回null。
	 * @example
	 * let datasetC=datasetA.div(datasetB, 0, 10000, -1) ;
	 */
	div(datasetB, validMin, validMax, fillData) {return null;}

	/**
	 * 深拷贝一个瓦片数据对象并返回。
	 * @returns {Dataset} 返回深拷贝的对象。
	 * @example
	 * let datasetB=datasetA.clone() ;
	 */
	clone() {return null;}

 
//5. JSAPI datasetSelf.addConst( number, filldata) ; 当前对象数据逐像素加常量，支持多波段.
//6. JSAPI datasetSelf.subConst( number, filldata) ; 当前对象数据逐像素减常量，支持多波段.
//7. JSAPI datasetSelf.mulConst( number, filldata) ; 当前对象数据逐像素乘常量，支持多波段.
//8. JSAPI datasetSelf.divConst( number, filldata) ; 当前对象数据逐像素除常量，支持多波段.
//
//
	/**
	 * 瓦片数据逐像素加一个数字常量，数据直接写在当前对象数据中，不返回新结果。支持多波段。开发者需要注意数据溢出的问题，
	 * 内部调用c++代码计算，效率高。
	 * @param {Number} number 数字常量。
	 * @param {Number} fillData 当前数据填充值，对于填充值跳过，不计算。
	 * @example
	 * datasetA.addConst(1 , 0) ;
	 */
	addConst(number, fillData) {}

	/**
	 * 瓦片数据逐像素 - 一个数字常量，数据直接写在当前对象数据中，不返回新结果。支持多波段。开发者需要注意数据溢出的问题，
	 * 内部调用c++代码计算，效率高。
	 * @param {Number} number 数字常量。
	 * @param {Number} fillData 当前数据填充值，对于填充值跳过，不计算。
	 * @example
	 * datasetA.subConst(1 , 0) ;
	 */
	subConst(number, fillData)  {}


	/**
	 * 瓦片数据逐像素 * 一个数字常量，数据直接写在当前对象数据中，不返回新结果。支持多波段。开发者需要注意数据溢出的问题，
	 * 内部调用c++代码计算，效率高。
	 * @param {Number} number 数字常量。
	 * @param {Number} fillData 当前数据填充值，对于填充值跳过，不计算。
	 * @example
	 * datasetA.mulConst(1 , 0) ;
	 */
	mulConst(number, fillData)  {}


	/**
	 * 瓦片数据逐像素 / 一个数字常量，数据直接写在当前对象数据中，不返回新结果。支持多波段。开发者需要注意数据溢出的问题，
	 * 内部调用c++代码计算，效率高。
	 * @param {Number} number 数字常量。
	 * @param {Number} fillData 当前数据填充值，对于填充值跳过，不计算。
	 * @example
	 * datasetA.divConst(1 , 0) ;
	 */
	divConst(number, fillData)  {}


	
}


/*



		let ds2 = PixelEngine.CompositeDsCollections(
		/// dsCollectionArr
		/// ,method //pe.CompositeMethodMin 1
		///         //pe.CompositeMethodMax 2
		///         //pe.CompositeMethodAve 3
		///         //pe.CompositeMethodSum 4
		///         //pe.CompositeMethodCnt 5 //2023-7-6 计数合成
		/// ,validMin
		/// ,validMax
		/// ,filldata
		/// [,outDataType]  //默认与输入数据一致
		/// );

		
			// JSAPI doc let dt1 = pe.NearestDatetimeBefore('mod/ndvi', pe.Datetime(2022,1,1) );
	// JSAPI doc let dt2 = pe.NearestDatetimeBefore('mod/ndvi', 20220101000000 ) ;

	/// JSAPI doc let dscoll = pe.NewDatasetCollection(datatype,width,height,nband,numdt);


	//pe.Datafile("/some/dir/file"); 

	//deprecated pe.roi()
	pe.NearestDatetimeBefore('dsname', 20201122000000 ) 2022-7-3
	pe.NearestDatetimeAfter('dsname', 20201122000000 ) 2022-7-3
	pe.DatasetCollection("dsname",[20010101030405,...])
	pe.DatasetCollection("dsname",datetimeCollection)
	const dtcollection=pe.BuildDtCollectionByStopDt(
///   2021,//stopyyyy
///   3,   //stopmm
///   31,  //stopdd
///   5    //n days before, e.g. this will make 3-26~3-31 total 6days
/// );


let dt1 = pe.NearestDatetimeBefore('mod/ndvi', pe.Datetime(2022,1,1) );
let dt1 = pe.NearestDatetimeAfter('mod/ndvi', pe.Datetime(2022,1,1) );
let dscoll = pe.NewDatasetCollection(datatype,width,height,nband,numdt);
let dscoll=pe.DatasetCollections("dsname",datetimeCollArray) 
/// datasetCollectionSelf.mask( masktiledata, filldata ); JSAPI doc
//对 DatasetCollection 每一个dataArr中的数据数组进行掩摸，所谓掩摸就是masktiledata为1的值保留，反之使用填充值替换。
//掩摸的结果保存在当前这个datasetCollection对象中。
//masktiledata should be uint8array


*/