import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  SortableContainerProps,
  SortEnd,
  Axis
} from 'react-sortable-hoc';
import { Button } from 'antd';
import { BsPlusLg } from 'react-icons/bs';
import { AiOutlineDrag } from 'react-icons/ai';
import { BiTrashAlt } from 'react-icons/bi';
import { v4 as uuidv4 } from 'uuid';
import React, { ReactNode } from 'react';


interface MySortableContainerProps /* extends SortableContainerProps */ {
  // children: React.ReactNode;
  onMove: any
  // children: React.ReactNode;
  // lockAxis: "x" | "y" | "xy";
  // useDragHandle: boolean;
  // onSortEnd: ({ oldIndex, newIndex }: SortEnd) => void;

  children: ReactNode;
  key: string;
  lockAxis: "y";
  useDragHandle: true;
  onSortEnd: ({ oldIndex, newIndex }: SortEnd) => void;
  axis?: Axis;
  helperClass?: string;
  disableAutoscroll?: boolean;

}

interface MySortableElement {
  children: React.ReactNode;
}

const SortableContainerr = SortableContainer(({ children }: MySortableContainerProps) => (
  <ul className={'space-y-5'}>{children}</ul>
))
const SortableItem = SortableElement(({ children }: MySortableElement) => (
  <li className="list-none">{children}</li>
))

class FormSort {
  static ADD({ obj, onAdd }: any) {
    const { add, move, fields, name } = obj
    return (
      <Button
        // key={name}
        type="dashed"
        shape="circle"
        className={`bg-white absolute right-0 z-10 top-0 -mt-4 mr-[90px] flex items-center justify-center`}
        icon={<BsPlusLg />}
        onClick={() => {
          add()
          console.log('fields.length, name', fields.length, name)
          move(fields.length, name)
          if (onAdd) onAdd()
        }}
      />
    )
  }

  static DRAG = SortableHandle(() => (
    <Button
      type="dashed"
      shape="circle"
      className="bg-white absolute right-0 z-10 top-0 -mt-4 mr-[50px] flex items-center justify-center"
      icon={<AiOutlineDrag className={'text-2xl'} />}
    />
  ))

  static DELETE({ onRemove }: any) {
    return (
      <Button
        onClick={onRemove}
        danger
        type="dashed"
        shape="circle"
        className="bg-white absolute right-0 z-10 top-0 -mt-4 mr-[10px] flex items-center justify-center"
        icon={<BiTrashAlt className={'text-2xl'} />}
      />
    )
  }

  static CONTAINER({ children, onMove, ...rest }: MySortableContainerProps) {
    return (
      <SortableContainerr
        // {...rest}
        key={uuidv4()}
        lockAxis="y"
        useDragHandle
        onSortEnd={({ oldIndex, newIndex }) => onMove(oldIndex, newIndex)}
      >
        {children}
      </SortableContainerr>
    )
  }


  static ITEM({ index, children }: any) {
    return <SortableItem index={index}>{children}</SortableItem>
  }
}

export default FormSort;
