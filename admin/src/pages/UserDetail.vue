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
    balance: '',
    createAt: '',
    updateAt: '',
    ipAddress: '',
    role: '',
});
const router = useRouter();
const id = router.currentRoute.value.params.id;

onMounted(() => {
    axios.get(`/users/${id}`).then((res) => {
        console.log(res);
        formState.value = res;
        console.log(formState.value);
    });
});
watch(() => formState.value, (newVal) => {
    formState.value.balance = newVal.balance ? newVal.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0;
    formState.value.createAt = newVal.createAt ? formatDateTime(newVal.createAt) : '';
    formState.value.updateAt = newVal.updateAt ? formatDateTime(newVal.updateAt) : '';
})
const changeBalance = (e) => {
    if (!e || isNaN(3)) return;
    formState.value.balance = e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const onFinish = async (values) => {
    console.log('Success:', values);
    const data = {
        ...values,
        // balance: values.balance ? values.balance.replace(/\D/g, '') : 0,
    };

    const layerLoad = layer.load(1);
    axios.put(`/users/${id}`, data).then((res) => {
        layer.msg('Cập nhật thành công', {
            icon: 1,
            time: 1500,
        });
    }).catch((err) => {
        layer.msg('Cập nhật thất bại', {
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
                                <a-form-item name="username" label="Họ và tên">
                                    <a-input v-model:value="formState.username" :rules="[
                                        { required: true, message: 'Vui lòng nhập họ và tên' },
                                        { min: 6, message: 'Họ và tên phải lớn hơn 6 ký tự' }
                                    ]" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item name="phone" label="Số điện thoại">
                                    <a-input v-model:value="formState.phone" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="Email" name="email" :rules="[
                                    { required: true, message: 'Vui lòng nhập email' },
                                    { type: 'email', message: 'Email không đúng định dạng' }
                                ]">
                                    <a-input v-model:value="formState.email" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item name="balance" label="Số dư">
                                    <a-input-number @change="changeBalance" style="width: 100%;"
                                        v-model:value="formState.balance" disabled />
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
                                <a-form-item label="Ngày tạo">
                                    <a-input v-model:value="formState.createAt" disabled />
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="Ngày cập nhật">
                                    <a-input v-model:value="formState.updateAt" disabled />
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="Địa chỉ ip">
                                    <a-input v-model:value="formState.ipAddress" disabled />
                                </a-form-item>
                            </a-col>
                            <!-- // bank info -->

                            <a-col :span="12">
                                <a-form-item label="CHọn ngân hàng
                                " name="bankName" :rules="[{ required: true, message: 'Vui lòng chọn ngân hàng' }]">
                                    <a-select v-model:value="formState.bankName">
                                        <a-select-option :value="bank.short_name" v-for="bank in banks"
                                            :key="bank.short_name">
                                            {{ `(${bank.short_name}) ${bank.name}` }}
                                        </a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">

                                <a-form-item label="Chi nhánh" name="bankBranch"
                                    :rules="[{ required: true, message: 'Vui lòng nhập chi nhánh' }]">
                                    <a-input v-model:value="formState.bankBranch"></a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">

                                <a-form-item label="Số tài khoản" name="bankAccountNumber"
                                    :rules="[{ required: true, message: 'Vui lòng nhập số tài khoản' }]">
                                    <a-input v-model:value="formState.bankAccountNumber"></a-input>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">

                                <a-form-item label="Tên tài khoản" name="bankAccountName"
                                    :rules="[{ required: true, message: 'Vui lòng nhập tên tài khoản' }]">
                                    <a-input v-model:value="formState.bankAccountName"></a-input>
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