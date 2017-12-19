package io.renren.common.annotation;

import java.lang.annotation.*;

/**
 * 数据过滤
 *
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2017/9/17 14:20
 */
//注解可以修饰的对象范围为方法
@Target(ElementType.METHOD)
//在运行时有效
@Retention(RetentionPolicy.RUNTIME)
//会被javadoc之类的工具处理，包括在文档中
@Documented
public @interface DataFilter {
    /**  表的别名 */
    String tableAlias() default  "";

    /**  true：没有本部门数据权限，也能查询本人数据 */
    boolean user() default true;
}
