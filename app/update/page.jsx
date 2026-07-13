'use client'

import DashboardContainer from '@/components/Dashboard/DashboardContainer'
import DashboardHeader from '@/components/Dashboard/DashboardHeader'
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Mail, RefreshCw, Trash, Users } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { baseURL } from '../lib/api'

export default function Page() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const [selectedItem, setSelectedItem] = useState('')

  // CONTINUE FROM HERE
  const mutation = useMutation({
    mutationFn: () => {
      return axios.delete(`${baseURL}`)
    },
  })

  const onDelete = () => {
    console.log('deleted')
    toast.success('تمامی موارد با موفقیت حذف گردید')
    onClose()
  }

  const onLetterOpen = () => {
    setSelectedItem('letters')
    onOpen()
  }
  const onPersonnelOpen = () => {
    setSelectedItem('personnel')
    onOpen()
  }

  return (
    <DashboardContainer>
      <DashboardHeader>بروزرسانی اطلاعات از اتوماسیون</DashboardHeader>
      <div className='pt-7 px-7'>
        <h2 className='font-bold text-2xl mb-4 flex items-center gap-3'>
          <Mail />
          نامه ها
        </h2>
        <div className='flex flex-row gap-32 my-10'>
          <Button size='lg' className='text-white bg-steel-600 p-8'>
            <RefreshCw size={25} />
            بروزرسانی نامه ها
          </Button>
          <Button
            size='lg'
            className='text-white bg-red-500 p-8'
            onPress={onLetterOpen}
          >
            <Trash size={25} />
            حذف تمامی نامه ها
          </Button>
        </div>
        <Divider />
        <h2 className='font-bold text-2xl my-4 flex items-center gap-3'>
          <Users />
          پرسنل
        </h2>
        <div className='flex flex-row gap-32 my-10'>
          <Button size='lg' className='text-white bg-steel-600 p-8'>
            <RefreshCw size={25} />
            بروزرسانی پرسنل
          </Button>
          <Button
            size='lg'
            className='text-white bg-red-500 p-8'
            onPress={onPersonnelOpen}
          >
            <Trash size={25} />
            حذف تمامی پرسنل
          </Button>
        </div>
      </div>

      <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1 text-xl'>
                هشدار
              </ModalHeader>
              <ModalBody>
                <p>آیا از حذف تمامی موارد اطمینان دارید؟</p>
                <p className='text-xs text-neutral-500 mb-3'>
                  پس از تایید تمامی موارد حذف خواهند شد و این عمل غیر قابل
                  بازگشت خواهد بود
                </p>
              </ModalBody>
              <Divider />
              <ModalFooter className='flex flex-row-reverse gap-4'>
                <Button color='default' variant='bordered' onPress={onClose}>
                  لغو
                </Button>
                <Button color='danger' onPress={onDelete}>
                  بله، تمامی موارد حذف گردند
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </DashboardContainer>
  )
}
