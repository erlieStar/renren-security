package io.renren.common.validator;


import io.renren.common.exception.RRException;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import java.util.Set;

/**
 * hibernate-validator校验工具类
 *
 * 参考文档：http://docs.jboss.org/hibernate/validator/5.4/reference/en-US/html_single/
 *
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2017-03-15 10:50
 */
public class ValidatorUtils {
    private static Validator validator;


    //静态代码块只执行一次，执行顺序，优先级从高到低，静态代码块>mian方法>构造代码块>构造方法
    static {
        validator = Validation.buildDefaultValidatorFactory().getValidator();
    }

    /**
     * 校验对象
     * @param object        待校验对象
     * @param groups        待校验的组
     * @throws RRException  校验不通过，则报RRException异常
     */

    //Class<?>...应该是一个Object类型的数组
    public static void validateEntity(Object object, Class<?>... groups)
            throws RRException {

        //第一个参数时要校验的对象，第二个参数时校验的规则，返回违反的约束或者为空
        Set<ConstraintViolation<Object>> constraintViolations = validator.validate(object, groups);
        if (!constraintViolations.isEmpty()) {
            //遍历违反的约束
        	ConstraintViolation<Object> constraint = (ConstraintViolation<Object>)constraintViolations.iterator().next();
        	//返回错误信息
            throw new RRException(constraint.getMessage());
        }
    }
}
