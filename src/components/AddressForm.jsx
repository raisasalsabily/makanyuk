import React from "react"
import { useForm } from "react-hook-form"
import Button from "./elements/Button"
import { ReactComponent as ArrowRightSvg } from "../assets/icons/arrow-right-long-svgrepo-com.svg"
import { useDispatch } from "react-redux"
import { setAddress } from "../stores/userInfo/addressSlice"

export const AddressForm = ({ onTabSwitch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    dispatch(setAddress(data))
    onTabSwitch("Payment")
  }

  return (
    <form
      className="md:w-2/3 md:mx-auto px-3 pt-1"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="mb-8 pt-4 text-h-sm md:text-center font-bold">
        Detail Pengantaran
      </h3>
      {/* nama penerima */}
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          for="custName"
        >
          Nama penerima
        </label>
        <input
          {...register("custName", { required: true })}
          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="custName"
          type="text"
          placeholder="Nama penerima"
        />
        {errors.address && (
          <span className="text-red-500">Data nama penerima diperlukan</span>
        )}
      </div>
      {/* no telp */}
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          for="custPhone"
        >
          Nomor telepon
        </label>
        <input
          {...register("custPhone", { required: true })}
          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="custPhone"
          type="text"
          placeholder="Nomor telepon"
        />
        {errors.address && (
          <span className="text-red-500">Data nomor telepon diperlukan</span>
        )}
      </div>
      {/* nama jalan */}
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          for="street address"
        >
          Nama jalan
        </label>
        <input
          {...register("address", { required: true })}
          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="street address"
          type="text"
          placeholder="Nama jalan"
        />
        {errors.address && (
          <span className="text-red-500">Data nama jalan diperlukan</span>
        )}
      </div>
      <div className="mb-4 md:flex md:justify-between">
        <div className="mb-4 md:mr-2 md:mb-0 flex-1">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            for="city"
          >
            Kota
          </label>
          <input
            {...register("city", { required: true })}
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="city"
            type="text"
            placeholder="Kota"
          />
          {errors.city && (
            <span className="text-red-500">Data kota diperlukan</span>
          )}
        </div>
        <div className="mb-4 md:mr-2 md:mb-0 flex-1">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            for="state"
          >
            Provinsi
          </label>
          <input
            {...register("state")}
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="state"
            type="text"
            placeholder="Provinsi"
          />{" "}
          {errors.city && (
            <span className="text-red-500">Data provinsi diperlukan</span>
          )}
        </div>
      </div>
      <div className="mb-4 md:flex md:justify-between">
        <div className="mb-4 md:mr-2 md:mb-0 flex-1">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            for="country"
          >
            Negara
          </label>
          <input
            {...register("country", { required: true })}
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="country"
            type="text"
            placeholder="Negara"
          />
          {errors.country && (
            <span className="text-red-500">Data negara diperlukan</span>
          )}
        </div>
        {/* kode pos */}
        <div className="mb-4 md:mr-2 md:mb-0 flex-1">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            for="postcode"
          >
            Kode pos
          </label>
          <input
            {...register("postcode", { required: true })}
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="postcode"
            type="text"
            placeholder="Kode pos"
          />
          {errors.postcode && (
            <span className="text-red-500">Data kode pos diperlukan</span>
          )}
        </div>
      </div>

      {/* <div className="mt-5">
        <label
          className="blcok mb-2 text-sm font-bold text-gray-700"
          for="delivery coupon code"
        >
          Delivery coupon code
        </label>
        <div className="flex">
          <input
            className="mt-3 w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
            type="text" 
            placeholder="Cek kode promo pengiriman" 
          />
          <div className="p-2">
            <Button>
              Pakai
            </Button>
          </div>
        </div>
      </div> */}

      <div className="flex justify-end p-2">
        <Button variant="dark" className="flex items-center" type="submit">
          <span className="mr-1">Lanjut</span>
          <ArrowRightSvg />
        </Button>
      </div>
    </form>
  )
}
