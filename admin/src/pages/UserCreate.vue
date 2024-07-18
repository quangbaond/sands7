<script setup>
import Header from '@/components/admin/Header.vue';
import Footer from '@/components/admin/Footer.vue';
import { reactive, onMounted, ref, watch } from 'vue';
import axios from '@/common/axios.js';
import { useRouter } from 'vue-router';
import { banks } from '@/common/constants.js';
import { layer } from '@layui/layer-vue';
import { formatDateTime } from '@/common';
const formState = ref({
    fullname: '',
    phone: '',
    email: '',
    role: 'user',
    password: '',
    passwordConfirm: '',
});
const router = useRouter();

const onFinish = async (values) => {
    console.log('Success:', values);
    const data = {
        ...values,
    };

    const layerLoad = layer.load(1);
    axios.post(`/users/create`, data).then((res) => {
        layer.msg('Cập nhật thành công', {
            icon: 1,
            time: 1500,
        });
    }).catch((err) => {
        layer.msg(err?.response?.data?.message ?? 'Cập nhật thất bại', {
            icon: 2,
            time: 1500,
        });
    }).finally(() => {
        layer.close(layerLoad);
    })
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
</script>

<template>
    <a-layout>
        <Header :selectedKeys="['1']"></Header>
        <a-layout-content style="padding: 20px 50px">
            <div :style="{ background: '#fff', padding: '12px', minHeight: 'calc(100vh - 170px)' }">
                <h3>Thông tin người dùng</h3>
                <div class="user_detail">
                    <a-form layout="vertical" :model="formState" @finish="onFinish" @finishFailed="onFinishFailed">
                        <a-row gutter="10">
                            <a-col :span="12">
                                <a-form-item name="username" label="Họ và tên" :rules="[
                                    { required: true, message: 'Vui lòng nhập họ và tên' },
                                    { min: 6, message: 'Họ và tên phải có ít nhất 6 ký tự' }
                                ]">
                                    <a-input v-model:value="formState.username" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item name="phone" label="Số điện thoại">
                                    <a-input v-model:value="formState.phone" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="Email" name="email" :rules="[
                                    { required: false, message: 'Vui lòng nhập email' },
                                    { type: 'email', message: 'Email không đúng định dạng' }
                                ]">
                                    <a-input v-model:value="formState.email" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item name="role" label="Quyền">
                                    <a-select v-model:value="formState.role" style="width: 100%">
                                        <a-select-option value="admin">Quản trị</a-select-option>
                                        <a-select-option value="user">Người dùng</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>

                            <a-col :span="12">
                                <a-form-item name="password" label="Mật khẩu" :rules="[
                                    { required: true, message: 'Vui lòng nhập mật khẩu' },
                                    { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
                                ]">
                                    <a-input-password v-model:value="formState.password" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item name="passwordConfirm" label="Xác nhận mật khẩu" :rules="[
                                    { required: true, message: 'Vui lòng xác nhận mật khẩu' },
                                    { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
                                    {
                                        validator: (rule, value, callback) => {
                                            if (value !== formState.password) {
                                                callback('Mật khẩu không khớp');
                                            } else {
                                                callback();
                                            }
                                        }
                                    }
                                ]">
                                    <a-input-password v-model:value="formState.passwordConfirm" />
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-form-item>
                            <a-button type="primary" html-type="submit">Lưu</a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
        </a-layout-content>
        <Footer></Footer>
    </a-layout>

</template>